# uniapp-caipiao

基于 **uni-app** 的彩票赛道概率预测前端项目，支持飞艇（类型 48）与赛车（类型 67）两种玩法，提供概率统计、AI 预测、投注与中奖记录展示等功能。

## 功能概览

- **首页**：选择飞艇 / 赛车彩种入口
- **赛道概率预测**：实时概率、历史开奖、倒计时、Token 登录
- **AI 预测**：多次预测与结果展示
- **自动投注配置**：开关设置、算法参数、投注记录 / 中奖记录表格展示

## 技术栈

- [uni-app](https://uniapp.dcloud.net.cn/)（Vue 2 / Vue 3 兼容写法）
- [diy-uview-ui](uni_modules/diy-uview-ui)
- [qiun-data-charts](uni_modules/qiun-data-charts)（图表）

## 目录结构

```
├── pages/                  # 页面
│   ├── index.vue           # 首页
│   ├── ft.vue              # 飞艇
│   ├── sc.vue              # 赛车
│   ├── forecast*.vue       # 预测与结果页
│   └── webview.vue
├── components/             # 公共组件
├── common/                 # 工具与样式
├── uni_modules/            # uni-app 模块
├── static/                 # 静态资源
├── siteinfo.js             # API 与站点配置
├── manifest.json
└── pages.json
```

## 环境要求

- [HBuilderX](https://www.dcloud.io/hbuilderx.html)（推荐），或 uni-app CLI 开发环境
- Node.js（使用 Vite 构建时）

## 快速开始

1. 克隆仓库

```bash
git clone https://github.com/collectionjia/uniapp-caipiao.git
cd uniapp-caipiao
```

2. 安装依赖（如使用 CLI）

```bash
npm install
```

3. 配置后端接口

编辑 `siteinfo.js` 中的 `basePath`：

```js
export default {
  basePath: '/cpapi', // 本地或线上 API 前缀
  title: '彩票百分比app',
  debug: true,
  appid: '31931'
}
```

4. 运行 / 打包

- 使用 **HBuilderX** 打开项目 → 运行到浏览器 / 小程序 / App
- H5 构建产物默认输出到 `unpackage/dist/build/h5`

## 主要页面说明

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `pages/index` | 彩种选择 |
| 飞艇 | `pages/ft` | 类型 48 概率与历史 |
| 赛车 | `pages/sc` | 类型 67 概率与历史 |
| 飞艇预测结果 | `pages/forecast10jieguo` | 投注配置与记录 |
| 赛车预测结果 | `pages/forecast10jieguo67` | 投注配置与记录 |

## 后端接口

前端通过 `siteinfo.js` 中的 `basePath` 访问后端，常见接口前缀为 `/cpapi/api/cp/*`（如 `stat`、`listTopData`、`aishow`、`updateToken` 等）。需配合后端服务 [caipiao-api](https://github.com/collectionjia/caipiao-api) 或自建 API 使用。

## 注意事项

- 请勿将 Token、密钥等敏感信息提交到仓库
- `unpackage/`、`node_modules/` 为构建与依赖目录，建议本地生成，不必纳入版本管理
- 生产部署 H5 时，请配置反向代理将 `/cpapi` 转发到实际后端地址

## License

Private / 内部项目，未经授权请勿商用。
