# 优测小宇宙

基于 Vite + React 的测试集合 SPA，部署到 GitHub Pages，同时支持 Capacitor 打包 Android APK 和独立的 React Native Android App。

## 功能

### 测试列表

| 测试 | 路径 | 类型 | 题数 | 说明 |
|------|------|------|------|------|
| PDP 领导力性格测试 | `/pdp` | 标准问答 | 30 题 | 5 种行为风格类型（老虎/孔雀/考拉/猫头鹰/变色龙） |
| BFTI 暴富性格测试 | `/bfti` | 标准问答 | 30 题 | 财富人格测试 |
| MBTI 十六型人格 | `/mbti` | 标准问答 | 93 题 | 经典 MBTI 类型 |
| 五行能量测试 | `/wuxing` | 表单模式 | 无题目 | 输入出生日期，基于八字计算五行能量分布与大运流年 |

### 每日运势

`/daily-fortune` — 基于农历八字和生肖的每日运势分析，包含五行评分图表和详细运势解读。

### App 原型导航

`AppPrototypePage` 提供类 App 的底部标签导航：

| 标签 | 路径 | 内容 |
|------|------|------|
| 首页 | `/` | 快捷入口网格、风控入口、每日运势模块、精选测试 |
| 报告 | `/reports` | 历史测试报告列表 |
| 权益 | `/benefits` | 会员权益页，含购买悬浮栏 |
| 我的 | `/me` | 个人资料/账户页面 |
| 测评 | `/assessments` | 完整测评列表（App 外壳版） |

### 两种测试模式

`TestPage` 自动适配两种模式：

| 模式 | `hasForm` | 数据源 | 计分函数入参 |
|------|-----------|--------|-------------|
| 标准问答 | absent / `false` | `questions[]` | `answers[]` |
| 表单模式 | `true` | 表单字段 | form values 对象 |

## 路由总览

| 路径 | 页面 | 参数 |
|------|------|------|
| `/` | `AppPrototypePage` | `activeTab="home"` |
| `/reports` | `AppPrototypePage` | `activeTab="reports"` |
| `/benefits` | `AppPrototypePage` | `activeTab="benefits"` |
| `/me` | `AppPrototypePage` | `activeTab="me"` |
| `/assessments` | `AssessmentsAppPage` | — |
| `/pdp` | `TestPage` | `testId="pdp"` |
| `/bfti` | `TestPage` | `testId="bfti"` |
| `/mbti` | `TestPage` | `testId="mbti"` |
| `/wuxing` | `TestPage` | `testId="wuxing"` |
| `/daily-fortune` | `DailyFortunePage` | — |
| `*` | `Navigate to="/"` | 404 兜底 |

## 技术栈

| 依赖 | 用途 |
|------|------|
| React + React DOM | UI 框架 |
| react-router-dom | SPA 路由 |
| Vite | 构建工具 |
| Capacitor | Android WebView 打包 |
| lunar-javascript | 农历/八字计算（五行测试 + 每日运势） |
| chart.js | 每日运势图表 |

## 本地开发

```bash
npm.cmd install
npm.cmd run dev
```

## 构建

```bash
npm.cmd run build        # 生产构建 → dist/（base: /，用于 GitHub Pages）
npm.cmd run build:android # Android WebView 构建（base: ./，Capacitor 同步）
npm.cmd run preview      # 预览生产构建
```

构建产物输出到 `dist/`。CI 在 `main` 推送后自动构建并部署到 GitHub Pages（Node 22）。

## Android APK 打包

### Capacitor WebView 方案（根目录 `android/`）

环境要求：JDK 21 + Android SDK。

```bash
npm.cmd run build:android
cd android
.\gradlew.bat clean assembleDebug
```

输出路径：`android/app/build/outputs/apk/debug/app-debug.apk`

需注意：
- `--base ./` 是必须的，保证 WebView 用相对路径加载资源
- 不要将 `server.allowNavigation` 设为 `["*"]`，会破坏支付宝等外部支付拉起
- 不要替换 Capacitor 的 `BridgeWebViewClient`

### React Native 方案（`native/` 目录）

独立 React Native App，不依赖根目录的 Vite 项目。详见 `native/AGENTS.md`。

输出路径：`native/android/app/build/outputs/apk/release/app-release.apk`

### App 内打开外链方案

外链遵循 4 层协议：
1. `capacitor.config.json` 域名白名单允许业务 H5 留在 App 内
2. React 中通过 `nativeLinkProps` 判断平台：浏览器用 `_blank`，Capacitor 走同窗跳转
3. 返回逻辑收敛在 `MainActivity.java` 的 `OnBackPressedDispatcher`
4. 返回悬浮球做成原生 `TextView` 覆盖层，不注入第三方 DOM

`android/app/src/main/java/com/martinaecc/tests/MainActivity.java` 中已完整实现。

## 目录结构

```
.
├── index.html                     # SPA 入口
├── vite.config.js                 # Vite 配置（base: /，自动生成 404.html）
├── capacitor.config.json          # Capacitor 配置
├── package.json                   # Web 项目依赖与脚本
├── AGENTS.md                      # Agent 操作手册
├── CLAUDE.md                      # 工作笔记
│
├── src/
│   ├── main.jsx                   # React 入口
│   ├── App.jsx                    # 路由配置（11 条路由）
│   ├── styles.css                 # 全局样式（单一文件，CSS 变量 + 响应式）
│   ├── data/
│   │   ├── tests.js               # 测试注册表
│   │   ├── pdp.js                 # PDP 测试数据
│   │   ├── bfti.js                # BFTI 测试数据
│   │   ├── mbti.js                # MBTI 测试数据
│   │   ├── wuxing.js              # 五行测试数据（表单模式）
│   │   ├── wuxing.test.js         # 五行计分单元测试
│   │   └── dailyFortune.js        # 每日运势计算引擎
│   ├── pages/
│   │   ├── AppPrototypePage.jsx   # App 原型主页（4 标签导航）
│   │   ├── AssessmentsAppPage.jsx # 测评列表（App 外壳版）
│   │   ├── TestPage.jsx           # 通用测试页面（标准 + 表单双模式）
│   │   ├── DailyFortunePage.jsx   # 每日运势页面
│   │   ├── HomePage.jsx           # 旧版首页
│   │   └── ComingSoonPage.jsx     # 占位页
│   └── components/
│       ├── AppShell.jsx           # App 外壳（底部标签栏 + 滚动容器）
│       ├── QuestionCard.jsx       # 测试题目组件
│       ├── ResultView.jsx         # 标准测试结果组件
│       ├── WuxingResultView.jsx   # 五行测试结果组件
│       ├── TestCard.jsx           # 测试入口卡片
│       ├── DailyFortuneForm.jsx   # 每日运势表单
│       ├── DailyFortuneResult.jsx # 每日运势结果
│       ├── DailyFortuneHomeCard.jsx  # 首页运势卡片
│       └── DailyFortunePreviewChart.jsx  # 运势预览图表
│
├── android/                       # Capacitor Android 项目
├── native/                        # 独立 React Native App
│   ├── App.tsx                    # RN 入口
│   ├── src/navigation/            # 导航配置
│   ├── src/screens/               # 6 个页面组件
│   ├── src/data/                  # TypeScript 测试数据
│   ├── src/utils/                 # 工具函数
│   └── android/                   # RN Android 工程
│
├── docs/                          # 设计文档
│   ├── 八字.md                     # 八字命理分析模板
│   └── superpowers/plans/         # 实现计划
└── .github/workflows/deploy.yml   # CI 部署到 GitHub Pages
```

## 部署

推送到 `main` 后，GitHub Actions 自动构建 `dist/` 并发布到 GitHub Pages。

仓库首次启用需确认 Settings → Pages → Source 选择 `GitHub Actions`。
