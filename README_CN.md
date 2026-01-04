# Mac AI Pilot

> **Apple Silicon 本地 AI 完全指南**

为在 Apple Silicon Mac（M1/M2/M3）上本地运行 AI 模型提供的综合文档站点。

## 🚀 功能特点

- **新手友好指南**：面向非技术用户的分步教程
- **技术深度解析**：GGUF 量化、内存优化、模型选择
- **交互式工具**：RAM 计算器帮助您为 Mac 选择合适的模型
- **原生应用指南**：Draw Things、Pinokio 等
- **自动部署**：已包含 GitHub Actions CI/CD 流水线
- **中英双语**：支持中文和英文界面切换

## 📖 文档板块

| 板块 | 描述 |
|------|------|
| **开始使用** | 介绍和入门指南 |
| **应用实验室** | AI 应用安装指南 |
| **模型库** | GGUF 模型指南和下载 |
| **工作流** | 每周技巧和教程 |

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（英文）
npm start

# 启动开发服务器（中文）
npm start -- --locale zh-Hans

# 生产环境构建
npm run build
```

网站将在 `http://localhost:3000/mac-ai-hub/` 可用

## 🌐 多语言支持

本站点支持：
- 🇺🇸 English（英文）
- 🇨🇳 简体中文

在网站右上角可以切换语言。

## 🚀 部署

查看 [GITHUB_SETUP.md](./GITHUB_SETUP.md) 了解如何部署到 GitHub Pages。

## 📁 项目结构

```
mac-ai-hub/
├── docs/                  # 英文文档
├── i18n/zh-Hans/         # 中文翻译
│   └── docusaurus-plugin-content-docs/
│       └── current/      # 中文文档
├── blog/                  # 博客/工作流
├── src/
│   └── components/
│       └── RamCalc.tsx   # 交互式 RAM 计算器
├── docusaurus.config.ts  # 站点配置
└── .github/workflows/    # CI/CD 流水线
```

## 🔧 技术栈

- **框架**：[Docusaurus v3](https://docusaurus.io/)
- **语言**：TypeScript
- **样式**：CSS Modules
- **部署**：GitHub Pages + GitHub Actions

## 📄 许可证

MIT 许可证 - 欢迎将此项目作为您自己文档站点的模板。

---

用 ❤️ 为 Apple Silicon AI 社区打造。
