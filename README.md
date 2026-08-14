# C 语言学习 App（PWA）

一个专为 **iPhone / iPad（也支持 Android）** 优化的 C 语言系统学习应用：
**12 章系统精讲 + 96 道练习题**，支持**离线使用**、**学习进度追踪**、**暗色模式**。

> 无需 Mac、无需 Xcode、无需上架 App Store：用 Safari 打开后"添加到主屏幕"即可像原生 App 一样全屏使用。

## ✨ 功能

| 功能 | 说明 |
| --- | --- |
| 📖 系统课程 | 12 章：入门 → 数据类型 → 运算符 → 输入输出 → 流程控制 → 数组字符串 → 函数 → 指针 → 结构体 → 动态内存 → 文件 → 预处理与进阶 |
| 💻 示例代码 | 每章多个可运行示例，语法高亮 + 一键复制 |
| ✏️ 习题练习 | 单选 / 多选 / 读代码 / 填空四种题型，答完立即给解析，章节练习分数自动记录 |
| 📊 学习进度 | 已完成章节、总进度环、每章最佳练习分数 |
| 🔍 全局搜索 | 搜索章节标题、知识点、代码 |
| 🌙 暗色模式 | 跟随系统 / 手动切换 |
| 📴 离线可用 | Service Worker 预缓存全部资源，断网也能学 |

## 📱 在 iPhone / iPad 上使用（3 步）

1. **把 App 放到一个手机能访问的地址**（见下方"如何让手机访问"）。
2. 用 iPhone 的 **Safari** 打开该地址。
3. 点 Safari 底部 **分享按钮** → **"添加到主屏幕"** → 打开主屏幕上的图标，即可全屏使用，与原生 App 无异。

> 提示：若要让"离线使用 + 安装"功能完整生效（PWA 要求 HTTPS），请用下方"部署到公网"的方式托管。

## 🖥 本地预览（电脑上）

```bash
cd c-learning-app
node server.js          # 或 powershell -ExecutionPolicy Bypass -File serve.ps1
# 电脑浏览器打开 http://localhost:8000
# 手机（同一 Wi-Fi）打开 http://<电脑IP>:8000
```

## 🚀 部署到公网（推荐，可获得 HTTPS 从而完整支持离线 PWA）

任选其一，全部免费：

- **GitHub Pages**：把 `c-learning-app` 文件夹内容推到仓库 → Settings → Pages → 选择分支，几分钟后获得 `https://<用户名>.github.io/<仓库>/`。
- **Netlify Drop**：打开 app.netlify.com/drop，直接把 `c-learning-app` 文件夹拖进去。
- **Cloudflare Pages**：直接上传文件夹即可。

之后在 iPhone 上用 Safari 打开该 HTTPS 地址并"添加到主屏幕"。

## 📂 目录结构

```
c-learning-app/
├── index.html            # 入口页面
├── manifest.webmanifest  # PWA 清单
├── sw.js                 # Service Worker（离线缓存）
├── css/app.css           # 全部样式（iOS 风格、暗色主题）
├── js/
│   ├── app.js            # 应用逻辑（路由/阅读/练习/进度/搜索）
│   └── highlight.js      # C 语法高亮
├── data/
│   └── chapter-01.js … chapter-12.js   # 章节内容与习题数据
├── icons/                # App 图标（180/192/512）
└── docs/
    ├── CONTENT_SPEC.md   # 章节数据格式规范
    └── validate.js       # 数据校验脚本（node docs/validate.js）
```

## ✍️ 自定义 / 增删章节

1. 按 `docs/CONTENT_SPEC.md` 的格式新建 `data/chapter-XX.js`（参考 `data/chapter-01.js` 写法）。
2. 在 `index.html` 和 `sw.js` 的预缓存列表中加入该文件。
3. 运行 `node docs/validate.js` 校验。

## 🔧 技术要点

- 纯原生 HTML/CSS/JS，**零依赖、零 CDN**，完全离线可用。
- 进度与成绩保存在 `localStorage`（键 `clearn.v1`）。
- Service Worker 采用"导航请求网络优先、静态资源缓存优先"策略，更新后刷新页面即可生效。
