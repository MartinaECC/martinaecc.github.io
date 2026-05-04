# MartinaECC 测试宇宙

基于 Vite + React 的测试集合网站，部署到 GitHub Pages。

## 功能

- 首页展示多个测试入口
- `/pdp`：PDP 性格测试，包含 30 道题和 5 种结果类型
- `/bfti`：BFTI 暴富TI测试占位页
- 测试题、结果画像和计分逻辑使用数据模块管理
- 支持电脑和手机访问

## 本地开发

```bash
npm.cmd install
npm.cmd run dev
```

## 构建

```bash
npm.cmd run build
```

构建产物输出到 `dist/`。

## 目录结构

```text
.
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── styles.css
│   ├── data/
│   │   ├── tests.js
│   │   └── pdp.js
│   ├── pages/
│   └── components/
└── .github/workflows/deploy.yml
```

## 部署

推送到 `main` 后，GitHub Actions 会自动构建并发布 `dist/` 到 GitHub Pages。

如果是第一次使用 Actions 部署 Pages，需要在仓库设置中确认：

- Settings → Pages
- Source 选择 `GitHub Actions`
