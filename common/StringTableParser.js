function stripHtml(html) {
	if (!html) {
		return '';
	}
	return html
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/<[^>]+>/g, '')
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.trim();
}

function parseKeyValueLine(line) {
	const result = {};
	const regex = /([\u4e00-\u9fa5]+):(\S+)/g;
	let match;
	while ((match = regex.exec(line)) !== null) {
		result[match[1]] = match[2];
	}
	return result;
}

function cell(text, color) {
	const value = text === undefined || text === null ? '' : String(text);
	if (!color) {
		return { text: value };
	}
	return { text: value, color: color };
}

const PAY_COLORS = {
	期数: 'blue',
	路数: 'red',
	号码: 'red',
	分数: 'blue',
	限制次数: 'red',
	投注次数: 'red',
	投注前金额: 'blue',
	投注金额: 'red',
	余额: 'blue'
};

const WIN_COLORS = {
	期数: 'blue',
	路数: 'red',
	投注号码: 'red',
	投注分数: 'blue',
	投注次数: 'red',
	投注前金额: 'blue',
	挣到金额: 'red',
	余额: 'blue'
};

function isEmptyMessage(str) {
	return !str || str.includes('结果已清空');
}

export function parseCountMap(html) {
	const lines = stripHtml(html).split('\n').map((line) => line.trim()).filter(Boolean);
	if (!lines.length) {
		return { caption: '', captionColor: 'blue', headers: ['分数', '数量'], rows: [] };
	}

	let caption = '';
	let startIdx = 0;
	if (lines[0].includes('~')) {
		caption = lines[0];
		startIdx = 1;
	}

	const rows = [];
	for (let i = startIdx; i < lines.length; i++) {
		const match = lines[i].match(/^([\d.]+):(\d+)$/);
		if (match) {
			rows.push([cell(match[1], 'blue'), cell(match[2], 'red')]);
		}
	}
	return {
		caption,
		captionColor: 'blue',
		headers: ['分数', '数量'],
		rows
	};
}

export function parseChooseNum(countmapdata, countmapdataold) {
	return {
		sections: [
			{ title: '当前统计', ...parseCountMap(countmapdata) },
			{ title: '历史统计', ...parseCountMap(countmapdataold) }
		]
	};
}

export function parseCurrentNum(html) {
	const lines = stripHtml(html).split('\n').map((line) => line.trim()).filter(Boolean);
	const rows = [];

	lines.forEach((line) => {
		const planMatch = line.match(/\(期数:([^)]+)\)/);
		const planNo = planMatch ? planMatch[1] : '';
		const roadMatch = line.match(/^(\d+)/);
		const road = roadMatch ? roadMatch[1] : '';
		const pairs = [...line.matchAll(/(\d+):([\d.]+)/g)];

		if (!pairs.length) {
			rows.push([
				cell(road || '-', 'red'),
				cell('-'),
				cell('-'),
				cell(planNo || '-', 'blue')
			]);
			return;
		}

		pairs.forEach((pair, index) => {
			rows.push([
				cell(index === 0 ? road : '', 'red'),
				cell(pair[1], 'red'),
				cell(pair[2], 'blue'),
				cell(index === 0 ? planNo : '', 'blue')
			]);
		});
	});

	return {
		headers: ['路数', '号码', '分数', '期数'],
		rows
	};
}

export function parsePayRecord(html) {
	const lines = stripHtml(html).split('\n').map((line) => line.trim()).filter(Boolean);
	const dataHeaders = ['期数', '路数', '号码', '分数', '限制次数', '投注次数', '投注前金额', '投注金额', '余额'];
	const headers = ['序号', ...dataHeaders];
	const sections = [];
	let current = null;

	const pushRow = (kv) => {
		if (!current) {
			current = {
				planNo: kv['期数'] || '',
				lastWinCount: '',
				betCount: '',
				headers,
				rows: []
			};
		}
		const rowNum = current.rows.length + 1;
		current.rows.push([
			cell(rowNum),
			...dataHeaders.map((key) => cell(kv[key] || '', PAY_COLORS[key]))
		]);
	};

	lines.forEach((line) => {
		const headerMatch = line.match(
			/期数[：:]\s*(\S+)\s+(?:上期赢的个数|上期中奖号|上期中奖)[：:]\s*(\S+)\s+投入号个数[：:]\s*(\S+)/
		);
		const legacyHeaderMatch = line.match(/期数[：:]\s*(\S+)\s+投入号个数[：:]\s*(\S+)/);
		if (headerMatch) {
			if (current && (current.rows.length || current.planNo)) {
				sections.push(current);
			}
			current = {
				planNo: headerMatch[1],
				lastWinCount: headerMatch[2],
				betCount: headerMatch[3],
				headers,
				rows: []
			};
			return;
		}
		if (legacyHeaderMatch) {
			if (current && (current.rows.length || current.planNo)) {
				sections.push(current);
			}
			current = {
				planNo: legacyHeaderMatch[1],
				lastWinCount: '',
				betCount: legacyHeaderMatch[2],
				headers,
				rows: []
			};
			return;
		}
		if (line.startsWith('支付')) {
			pushRow(parseKeyValueLine(line));
		}
	});

	if (current && (current.rows.length || current.planNo)) {
		sections.push(current);
	}

	return { sections };
}

export function parseWinRecord(html, initmoney, agentmoney) {
	const lines = stripHtml(html).split('\n').map((line) => line.trim()).filter(Boolean);
	const headers = ['期数', '路数', '投注号码', '投注分数', '投注次数', '投注前金额', '挣到金额', '余额'];
	const rows = [];
	let virtualMoney = initmoney;
	let realMoney = agentmoney;

	lines.forEach((line) => {
		if (line.includes('虚拟余额')) {
			const match = line.match(/虚拟余额：(\S+)/);
			if (match) {
				virtualMoney = match[1];
			}
			return;
		}
		if (line.includes('真实余额')) {
			const match = line.match(/真实余额：(\S+)/);
			if (match) {
				realMoney = match[1];
			}
			return;
		}
		if (!line.startsWith('赢了')) {
			return;
		}
		const kv = parseKeyValueLine(line);
		rows.push(headers.map((key) => cell(kv[key] || '', WIN_COLORS[key])));
	});

	return {
		balanceInfo: [
			cell(`虚拟余额：${virtualMoney || '-'}`, 'blue'),
			cell(`真实余额：${realMoney || '-'}`, 'red')
		],
		headers,
		rows
	};
}

export function parseCsvText(text) {
	const lines = String(text || '').split('\n').map((line) => line.trim()).filter(Boolean);
	if (!lines.length) {
		return { headers: [], rows: [] };
	}

	const colCount = Math.max(...lines.map((line) => line.split(',').length));
	const headers = ['组', ...Array.from({ length: colCount }, (_, index) => `${index + 1}路`)];
	const rows = lines.map((line, index) => {
		const cols = line.split(',');
		return [cell(`第${index + 1}组`, 'blue'), ...cols.map((value) => cell(value))];
	});

	return { headers, rows };
}

export function buildStatTable(res20, res50, res100) {
	const headers = ['赛道', '期数', '号码', '概率'];
	const rows = [];
	const periods = [
		{ label: '20期', data: res20?.data || [] },
		{ label: '50期', data: res50?.data || [] },
		{ label: '100期', data: res100?.data || [] }
	];

	(res20?.data || []).forEach((item, index) => {
		const track = String(item.index + 1);
		periods.forEach(({ label, data }) => {
			const stat = data[index]?.stat || [];
			stat.forEach((entry) => {
				const hot = Number(entry.willRate) > 95;
				rows.push([
					cell(track, 'blue'),
					cell(label),
					cell(String(entry.number), hot ? 'red' : ''),
					cell(`${entry.willRate}%`, hot ? 'red' : '')
				]);
			});
		});
	});

	return { headers, rows };
}

export function buildAiShowTables(data) {
	if (!data || typeof data !== 'object') {
		return {
			empty: true,
			message: '结果已清空，等下次结果出现。。。'
		};
	}

	const payload = {
		countmapdata: data.countmapdata || data.countMapData || '',
		countmapdataold: data.countmapdataold || data.countMapDataold || '',
		currentNum: data.currentNum || '',
		payRecord: data.payRecord || '',
		winRecord: data.winRecord || '',
		initmoney: data.initmoney || data.initMoney || '',
		agentmoney: data.agentmoney || data.agentMoney || ''
	};

	return {
		empty: false,
		chooseNum: parseChooseNum(payload.countmapdata, payload.countmapdataold),
		currentNum: parseCurrentNum(payload.currentNum),
		payRecord: parsePayRecord(payload.payRecord),
		winRecord: parseWinRecord(payload.winRecord, payload.initmoney, payload.agentmoney)
	};
}

export { isEmptyMessage, stripHtml, cell };
