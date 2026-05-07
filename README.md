# 优鉴信用

一个包含网页版、Android WebView 套壳 App 和 React Native 原生 App 三端并行的测试集合项目，部署到 GitHub Pages，支持 Android APK 打包。

## 三端总览

### 1. 网页版（`src/`）— Vite + React SPA

面向 H5 浏览器和 GitHub Pages 部署的纯前端单页应用。以类 App 的底部标签导航组织页面，包含首页（快捷入口网格、风控入口、每日运势模块）、报告列表、会员权益、个人中心，以及 4 个在线测试和每日运势功能。所有测试数据以 JS 模块驱动，支持标准问答和表单两种模式。样式采用单一 CSS 文件 + CSS 自定义属性，暖色调纸质美学，响应式适配手机到桌面。

**依赖：** React + react-router-dom + Vite + Chart.js + lunar-javascript

**部署：** GitHub Actions 自动构建 `dist/` 并发布到 GitHub Pages

### 2. Android WebView 套壳（`android/`）— Capacitor

将网页版打包为 Android APK。Capacitor 将 `dist/`（以 `--base ./` 构建）嵌入 WebView，通过原生层处理返回手势、外链白名单和悬浮返回按钮。 `MainActivity.java` 接管了 `OnBackPressedDispatcher`，实现 WebView 历史栈导航、外部页面返回首页、原生返回悬浮球覆盖层等完整交互逻辑。 `capacitor.config.json` 配置了业务域名白名单，既让外链留在 App 内，又不影响支付宝等外部支付的 deep link 拉起。

**包名：** `com.martinaecc.tests`  
**输出：** `android/app/build/outputs/apk/debug/app-debug.apk`  
**依赖：** Capacitor Android + JDK 21

### 3. React Native 原生 App（`native/`）— React Native 0.85 + TypeScript

从零搭建的独立 React Native 应用，与根目录 Vite 项目无代码共享，所有页面用 RN 原生组件重写。使用 `@react-navigation` 实现底部标签导航（首页/报告/福利/我的）+ Stack 路由（测评列表、测试引擎、每日运势、WebView 外链容器）。测试引擎以纯 TypeScript 实现，支持 PDP/BFTI/MBTI 标准问答和五行表单两种模式，计分逻辑和数据与网页版保持一致（手动移植）。WebView 容器同样支持业务域名白名单和外部 scheme 拦截。

**包名：** `com.martinaecc.app`  
**输出：** `native/android/app/build/outputs/apk/release/app-release.apk`（内嵌 JS bundle，独立运行）  
**依赖：** React Native 0.85 + @react-navigation + react-native-webview + lunar-javascript + TypeScript

---

## 功能

### 测试列表

| 测试 | 路径 | 模式 | 题数 | 说明 |
|------|------|------|------|------|
| PDP 领导力性格测试 | `/pdp` | 标准问答 | 30 题 | 5 种行为风格类型（老虎/孔雀/考拉/猫头鹰/变色龙） |
| BFTI 暴富性格测试 | `/bfti` | 标准问答 | 30 题 | 财富人格测试 |
| MBTI 十六型人格 | `/mbti` | 标准问答 | 93 题 | 经典 MBTI 类型 |
| 五行能量测试 | `/wuxing` | 表单模式 | — | 输入出生日期，基于八字计算五行能量分布与大运流年 |

### 每日运势

`/daily-fortune` — 基于农历八字和生肖的每日运势分析，包含五行评分图表和详细运势解读。

### App 导航（网页版）

| 标签 | 路径 | 内容 |
|------|------|------|
| 首页 | `/` | 快捷入口网格、风控入口、每日运势模块、精选测试 |
| 报告 | `/reports` | 历史测试报告列表 |
| 权益 | `/benefits` | 会员权益页，含购买悬浮栏 |
| 我的 | `/me` | 个人资料/账户页面 |
| 测评 | `/assessments` | 完整测评列表（App 外壳版） |

### 两种测试模式

`TestPage` 自动适配：

| 模式 | `hasForm` | 数据源 | 计分函数入参 |
|------|-----------|--------|-------------|
| 标准问答 | absent / `false` | `questions[]` | `answers[]` |
| 表单模式 | `true` | 表单字段 | form values 对象 |

## 路由总览（网页版）

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

## React Native 导航

```
RootNavigator (NativeStack)
├── MainTabs (BottomTab)
│   ├── Home（首页 / 优鉴信用）
│   ├── Reports（报告）
│   ├── Benefits（优鉴会员）
│   └── Me（我的）
├── Assessments（测试宇宙）→ 测试卡片 + 每日运势入口
├── AssessmentTest（测试引擎）→ 标准问答 / 五行表单
├── DailyFortune（每日运势）→ 运势结果 / 出生信息表单
└── WebView（外链容器）→ 业务域名白名单 + scheme 拦截
```

## 技术栈（网页版）

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

CI 在 `main` 推送后自动构建并部署到 GitHub Pages（Node 22）。

## Android APK 打包

### Capacitor WebView 方案（根目录 `android/`）

环境要求：JDK 21 + Android SDK。

```bash
npm.cmd run build:android
cd android
.\gradlew.bat clean assembleDebug
```

输出路径：`android/app/build/outputs/apk/debug/app-debug.apk`

注意：
- `--base ./` 是必须的，保证 WebView 用相对路径加载资源
- 不要将 `server.allowNavigation` 设为 `["*"]`，会破坏支付宝等外部支付拉起
- 不要替换 Capacitor 的 `BridgeWebViewClient`

### React Native 方案（`native/`）

独立 React Native App，详见 `native/AGENTS.md`。

```bash
cd native
npm install
npm run ts:check
cd android
.\gradlew.bat assembleRelease
```

输出路径：`native/android/app/build/outputs/apk/release/app-release.apk`

Release APK 内嵌 JS bundle，不需要 Metro 即可独立运行。

### App 内打开外链

两套方案均遵循相同的 4 层协议：
1. 域名白名单允许业务 H5 留在 App 内（Capacitor: `capacitor.config.json`；RN: `WebViewScreen.tsx` 内 `allowList`）
2. 原生环境不对外链使用 `target="_blank"`（Capacitor: `nativeLinkProps`；RN: WebView 内处理）
3. 返回逻辑收敛在原生层（Capacitor: `MainActivity.java` OnBackPressedDispatcher；RN: WebView 内 `onNavigationStateChange` + hardware back handler）
4. 外部 scheme（alipays、tel 等）拦截并交给系统处理

## 目录结构

```
.
├── index.html                     # SPA 入口
├── vite.config.js                 # Vite 配置（base: /，自动生成 404.html）
├── capacitor.config.json          # Capacitor 配置
├── package.json                   # 网页项目依赖与脚本
├── AGENTS.md                      # Agent 操作手册
├── CLAUDE.md                      # 工作笔记
│
├── src/                           # 网页版源码
│   ├── main.jsx                   # React 入口
│   ├── App.jsx                    # 路由配置（11 条路由）
│   ├── styles.css                 # 全局样式（单一文件）
│   ├── data/                      # 测试数据与引擎
│   │   ├── tests.js               # 测试注册表
│   │   ├── pdp.js / bfti.js / mbti.js / wuxing.js  # 测试数据
│   │   ├── wuxing.test.js         # 五行计分单元测试
│   │   └── dailyFortune.js        # 每日运势计算引擎
│   ├── pages/                     # 页面组件（6 个）
│   └── components/                # 公共组件（9 个）
│
├── android/                       # Capacitor Android 项目
│   └── app/src/main/java/com/martinaecc/tests/
│       └── MainActivity.java      # 返回逻辑 + 原生悬浮按钮
│
├── native/                        # React Native 独立项目
│   ├── App.tsx                    # RN 入口（NavigationContainer）
│   ├── app.json                   # 应用名：优鉴信用
│   ├── package.json               # RN 依赖（独立于根目录）
│   ├── src/
│   │   ├── navigation/            # RootNavigator + MainTabs
│   │   ├── screens/               # 8 个页面组件
│   │   ├── data/                  # TS 测试数据（与网页版功能一致）
│   │   └── utils/                 # openLink 工具
│   └── android/                   # RN Android 工程
│
├── docs/                          # 设计文档
│   └── superpowers/plans/         # 实现计划
│
└── .github/workflows/deploy.yml   # CI 部署到 GitHub Pages
```

## 部署

推送到 `main` 后，GitHub Actions 自动构建 `dist/` 并发布到 GitHub Pages。

仓库首次启用需确认 Settings → Pages → Source 选择 `GitHub Actions`。
