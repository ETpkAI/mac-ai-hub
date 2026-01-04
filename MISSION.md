PROJECT MISSION: Mac AI Hub (Architectural Blueprint)
Role: You are a Senior Full-Stack Engineer and Mac Optimization Specialist. Goal: Build, Configure, and Deploy a Docusaurus v3 documentation site dedicated to Apple Silicon AI tools. Context: This site is for non-technical users ("Creators") and developers ("Geeks"). It focuses on Tutorials (Teaching) and Resources (Downloads).

🏗️ PHASE 1: SCAFFOLDING & CONFIGURATION (The Foundation)
1.1 Initialization
Action: Initialize a new Docusaurus project in the current directory using TypeScript.

Command: npx create-docusaurus@latest. classic --typescript

Note: If the directory is not empty, ask for permission to clean it or use a subfolder.

1.2 Configuration (docusaurus.config.ts)
Refactor the config file to strictly match these requirements:

Title: "Mac AI Pilot"

Tagline: "The Missing Manual for Local AI on Apple Silicon"

URL: "https://your-github-username.github.io" (Placeholder)

BaseUrl: "/mac-ai-hub/" (Assuming GitHub Pages repository name)

Navbar Structure (Crucial for User Experience):

Start Here (/docs/intro) -> The "Teaching" Section.

Model Vault (/docs/models) -> The "Downloads" Section (GGUF Links).

App Lab (/docs/apps) -> Software setup guides.

Workflows (/blog) -> Use the Blog plugin for "Weekly Workflow" updates.

Theme: Set defaultMode: 'dark' (AI users prefer dark mode).

📝 PHASE 2: CONTENT ARCHITECTURE (The Value)
Delete all default Docusaurus content (intro.md, tutorial-basics, etc.) and generate the following file structure in docs/:

2.1 Section: TEACHING (docs/apps/)
Create comprehensive guides for the following Mac-specific tools. Use :::tip and :::warning blocks heavily.

setup-guide.mdx: "The Golden Path: Preparing your Mac".

Explain installing Homebrew and Python 3.10 (Not 3.12, warn about compatibility).

draw-things.mdx: "Draw Things: The Best Native App".

Highlight: No command line needed, runs on Metal API.

pinokio.mdx: "Pinokio: One-Click Installer".

Explain how to bypass the "Unverified Developer" warning on macOS (xattr -cr).

2.2 Section: DOWNLOADS (docs/models/)
This is a high-traffic section. Do not host files. Provide curated, high-speed links to HuggingFace/Civitai.

gguf-basics.mdx: "Understanding GGUF & RAM".

Interactive Component Task: Create a simple React component (in src/components/RamCalc.tsx) that lets users input their Mac's RAM (8GB/16GB/32GB) and tells them which Quantization (Q4/Q5/Q8) to download. Embed this component here.

top-models.mdx: "Essential Models for Mac".

Create a Markdown table comparing: Llama 3, Mistral, Gemma.

Columns: Model Name, Min RAM, Recommended Quant, Download Link.

🔧 PHASE 3: GITHUB INTEGRATION & DEPLOYMENT (DevOps)
Objective: Connect this local folder to GitHub and set up auto-deployment.

3.1 Version Control Setup
Initialize Git: git init

Create .gitignore: Ensure node_modules, build, .docusaurus, and .env are ignored.

Branch Strategy:

main: Source code.

gh-pages: Static build artifacts (will be handled by Actions).

3.2 CI/CD Pipeline (.github/workflows/deploy.yml)
Create a GitHub Actions workflow file to automate deployment.

Trigger: On push to main.

Permissions: Must set contents: write to allow the bot to publish.

Steps:

Checkout code.

Install Node.js 18.

npm ci (Clean install).

npm run build.

Deploy to gh-pages branch using peaceiris/actions-gh-pages@v3.

3.3 GitHub Repository Connection (Instructions for Human)
*Since you (the Agent) cannot create a remote repo, please generate a GITHUB_SETUP.md file for the user with these exact terminal commands to run manually:*bash git add. git commit -m "Initial commit by Antigravity Agent" git branch -M main git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git git push -u origin main


🚦 EXECUTION PROTOCOL (How to proceed)
Switch to Planning Mode.

Analyze the file structure requirements.

Step 1: Execute Phase 1 (Scaffolding). Do not proceed until npm start works locally.

Step 2: Execute Phase 2 (Content & Components). Ensure the RAM Calculator component compiles correctly with TypeScript.

Step 3: Execute Phase 3 (DevOps files).

Final: Generate the GITHUB_SETUP.md file so the user can go live.

Awaiting your implementation plan.



下面是中文文档，是上面的补充和说明

谷歌 Antigravity 驱动的自动化开发架构报告：Mac AI 资源站构建与 GitHub 集成全案
1. 执行摘要与架构愿景
在软件工程的演进历程中，开发环境经历了从简单的文本编辑器到集成开发环境（IDE），再到如今的“智能体优先”（Agent-First）开发平台的范式转移。谷歌推出的 Antigravity 平台不仅仅是一个增强版的代码编辑器，它代表了多智能体编排（Multi-Agent Orchestration）的新纪元 1。本项目——“Mac AI 资源站”的构建，不仅是一次技术文档站点的搭建任务，更是对这一新型开发范式的深度实践。
本报告旨在定义一份详尽、可执行且具备高度鲁棒性的“核心指令文档”，供 Antigravity 的 AI 智能体读取并执行。我们的目标是构建一个基于 Docusaurus v3 的静态网站，该网站不仅在技术栈上严格遵循 TypeScript 的类型安全标准，还在内容上精准定位 Apple Silicon（M1/M2/M3）芯片与本地大语言模型（LLM）推理的结合点 3。更关键的是，本报告新增了完整的 DevOps 自动化维度，涵盖了从 Git 版本控制的初始化到基于 GitHub Actions 的持续部署（CI/CD）流水线的构建 5。
通过将构建逻辑、内容策略与运维自动化紧密结合，我们不仅仅是在生成代码，而是在设计一套能够自我维持、自动交付的软件生命周期系统。本报告将深入剖析每个决策背后的技术原理——从 Docusaurus v3 的架构优势到 GGUF 量化模型的内存物理学，再到 GitHub Actions 的安全鉴权机制——最终汇聚成一份能够驱动智能体自主工作的核心指令。
2. 智能体开发环境：Google Antigravity 的深度解析
要编写一份有效的“核心指令文档”，首先必须理解执行者的本质。Google Antigravity 与传统的 Copilot 类辅助工具存在本质区别。
2.1 任务级委派与“任务控制中心”
传统的 AI 编码助手通常局限于代码补全或内联建议，依然需要开发者逐行审查。而 Antigravity 引入了“任务控制中心”（Mission Control）的概念，允许开发者以管理者的身份分发宏观任务（如“重构整个模块”或“搭建 CI/CD 流水线”），由后台的异步智能体负责规划、实施与验证 2。这意味着我们的指令文档不能仅仅是代码片段的堆砌，而必须是一个结构化的“任务清单”，能够被智能体解析为一系列可执行的步骤（Steps）。
Antigravity 的智能体具备跨“表面”（Surface）的操作能力，它们可以同时操作编辑器、终端（Terminal）和浏览器 7。因此，我们的指令必须明确涵盖这三个维度的操作：
编辑器维度：修改 docusaurus.config.ts 等配置文件。
终端维度：执行 npm run build 或 git init 等命令。
浏览器维度：虽然主要用于预览，但在构建阶段，我们需要智能体理解浏览器端的路由行为（如 baseUrl 的配置对资源加载的影响）8。
2.2 规划模式（Planning Mode）与工件（Artifacts）
Antigravity 提供了“规划模式”和“快速模式”两种交互方式。对于本项目这种涉及复杂配置（TypeScript）和基础设施搭建（GitHub Actions）的任务，必须强制智能体使用“规划模式” 9。在这种模式下，智能体会在编写任何代码之前生成“工件”（Artifacts），如实施计划（Implementation Plan）或任务列表。
这不仅是为了建立信任，更是为了防止“幻觉链”的产生。在 Docusaurus v3 与 TypeScript 的结合中，配置文件的类型定义非常严格。如果智能体在“快速模式”下直接生成代码，极易忽略 @docusaurus/module-type-aliases 等依赖的安装，导致后续编译失败。通过指令文档强制智能体先生成检查清单，我们可以利用其内置的逻辑验证机制，确保 tsconfig.json 的配置与 Webpack 的构建逻辑在理论层面先行对齐 10。
特性
传统 IDE (VS Code + Copilot)
Google Antigravity (Agentic IDE)
本项目指令策略
交互核心
文本编辑、自动补全
任务编排、多智能体协作
提供宏观架构指令，而非微观代码片段
执行范围
当前文件上下文
跨文件、跨终端、跨浏览器
明确跨上下文的操作顺序（先配置 Git，再配置 CI）
验证机制
开发者手动 Lint/Test
智能体生成“工件”供审查
强制要求生成 checklist.md 作为验证工件
状态管理
同步、即时
异步、长运行
设计原子化的任务步骤，防止上下文丢失

3. 技术栈架构：Docusaurus v3 与 TypeScript 的深度融合
选择 Docusaurus v3 作为基础设施并非随意的决定，而是基于其在现代静态站点生成器（SSG）中的卓越表现，特别是其对 MDX 3 和 React 18 的支持 12。然而，要在智能体环境中稳健地运行这一框架，TypeScript 的引入是绝对必要的。
3.1 TypeScript：智能体的逻辑护栏
在自然语言编程中，模糊性是最大的敌人。TypeScript 通过静态类型系统为智能体提供了确定性的“护栏”。
类型即文档：docusaurus.config.ts 文件中的类型注解（如 import('@docusaurus/types').Config）不仅仅是为了编译通过，它们实际上充当了智能体的上下文提示。当智能体读取到 Config 类型定义时，它能更准确地推断出 themeConfig 下的 navbar 结构，从而避免编造出不存在的配置项 10。
组件契约：在“Mac AI 资源站”中，我们将大量使用自定义 React 组件来展示硬件基准测试数据。通过 TypeScript 接口（Interface）定义数据结构（例如 interface GPUBenchmark { model: string; tps: number; }），我们可以强制智能体生成的组件代码严格遵循这一契约，避免因数据结构不匹配导致的运行时错误（Hydration Errors）10。
我们的核心指令将明确要求在初始化时使用 --typescript 标志。这会自动生成包含必要类型别名（Type Aliases）的 tsconfig.json，确保从项目启动的第一秒起，类型检查机制就在通过 Antigravity 的后台进程运行 13。
3.2 MDX 3 与内容架构的现代化
Docusaurus v3 引入了 MDX 3，这改变了 Markdown 中嵌入组件的方式。旧版本中的某些松散语法（如直接使用 HTML 标签而不闭合）在 v3 中会被严格报错。
指令含义：我们必须指示智能体在生成内容时，遵循严格的 JSX 语法规范。例如，在编写关于 Apple Silicon 内存架构的文章时，如果需要嵌入一个提示框（Admonition），智能体必须使用标准的 :::tip 语法或正确导入的 React 组件，而不能混用不规范的 HTML 12。
交互式文档：MDX 的强大之处在于其可编程性。我们规划的“资源站”不仅仅是静态文本，还包括交互式的“内存计算器”。指令文档将包含创建一个 React 组件的任务，该组件允许用户输入 Mac 的统一内存大小（如 16GB），并动态计算出可运行的最大量化模型参数量。这需要智能体理解 React Client Components 与 SSG 的边界。
4. 内容领域深度分析：Apple Silicon 与本地大模型
“Mac AI 资源站”的核心价值在于其内容的专业性和针对性。不同于通用的 AI 教程，本站点必须深刻剖析 Apple Silicon 架构下的特殊性。智能体需要被灌输相关的领域知识，以便生成高质量的初始文档。
4.1 统一内存架构（UMA）的物理限制
传统的 PC 架构将 CPU 内存（RAM）和 GPU 显存（VRAM）物理隔离，而 Apple Silicon 采用统一内存架构（UMA）。这一特性是 Mac 运行本地 LLM 的核心优势，也是最大的误区来源。
内存墙与带宽：M1/M2/M3 Max 和 Ultra 芯片的高内存带宽（最高可达 800GB/s）是决定推理速度（Tokens per Second, TPS）的关键因素，而不仅仅是计算核心数。然而，系统保留内存是一个硬性约束。macOS 通常会保留 4-6GB 内存用于系统进程和显示输出。
智能体生成策略：在核心指令中，我们将要求智能体生成一份“硬件选型指南”。这份指南必须包含一个逻辑判断：如果用户拥有 16GB 内存的 MacBook Air，除去系统占用，实际可用于模型的内存仅约 10-11GB。这意味着 7B 模型（Q4 量化约 5GB）可以流畅运行，但 13B 模型（Q4 量化约 8-9GB）将逼近物理极限，一旦开启浏览器或其他应用，就会触发严重的 Swap（交换内存），导致性能从 30 t/s 骤降至 1 t/s 3。
下表展示了智能体需要在文档中生成的关键数据矩阵：
芯片型号 (Chipset)
统一内存 (RAM)
内存带宽 (Bandwidth)
推荐模型规模 (Max Model Size)
典型量化等级 (Quantization)
M1/M2/M3 Base
8GB
~100 GB/s
7B
Q4_K_M (极限)
M1/M2/M3 Pro
18GB/36GB
~150-200 GB/s
13B - 30B
Q4_K_M / Q5_K_M
M1/M2/M3 Max
64GB+
~400 GB/s
70B (Llama-3)
Q4_K_M
M1/M2 Ultra
128GB+
~800 GB/s
120B+ (Goliath)
Q4_K_M

4.2 GGUF 量化标准与文件格式
GGUF（GPT-Generated Unified Format）是目前本地推理的事实标准，由 llama.cpp 项目定义。
技术背景：GGUF 取代了旧的 GGML 格式，主要改进在于其二进制格式设计为可直接内存映射（mmap）。这意味着加载一个 20GB 的模型不需要读取 20GB 的数据到 RAM 再处理，而是瞬间完成映射，操作系统按需加载页面。这对于 Mac 的 UMA 架构尤为重要 16。
量化精度的权衡：智能体需要生成的文档应解释不同量化等级的数学含义。
Q4_K_M：这是目前的“甜点”位。它并非简单的 4-bit 截断，而是关键层（Attention 矩阵等）保留高精度，非关键层使用 4-bit。其 Perplexity（困惑度）损失极小，但显存占用减少近 50%。
Q8_0：对于代码生成（Coding）等对逻辑严密性要求极高的任务，文档应推荐 Q8_0，尽管其内存占用接近 FP16 的一半，但能避免逻辑断裂 3。
5. 运维自动化架构：GitHub 集成与 CI/CD
如果说 Antigravity 是发射台，Docusaurus 是火箭，那么 GitHub Integration 就是导航与遥测系统。本项目的核心指令新增了极其关键的 GitHub 集成部分，涵盖了从代码版本化到自动化发布的完整闭环。
5.1 Git 初始化与“肮脏”文件的防御
在项目初期（Day 0），正确的 Git 配置是防止未来技术债的关键。Antigravity 智能体在执行 git init 时，必须同步创建 .gitignore 文件。
构建产物的隔离：Docusaurus 的构建过程会生成 .docusaurus/（缓存）和 build/（静态文件）目录。如果不将它们加入忽略列表，不仅会导致仓库体积膨胀，更致命的是，这会与 GitHub Actions 的自动部署逻辑产生冲突。
环境变量的保护：尽管是静态站点，开发过程中可能会用到 .env.local 存放本地测试用的 API Key。智能体必须确保这些文件被默认忽略，以防密钥泄露 5。
5.2 GitHub Actions：自动化部署的心脏
手动部署（Locally building and pushing）在现代 DevOps 理念中是被严格禁止的，因为它依赖于开发者本地环境的一致性，且存在安全隐患（需要本地管理 SSH Key）。我们将采用 GitHub Actions 实现“GitOps”流程。
5.2.1 工作流文件剖析 (.github/workflows/deploy.yml)
我们将指示智能体创建一个标准化的 YAML 配置文件。以下是该文件的关键架构决策：
触发机制 (on: push)：仅当代码推送到 main 分支时触发。这确保了开发分支的不稳定性不会影响生产环境 6。
环境一致性 (npm ci)：在安装依赖步骤，必须使用 npm ci 而非 npm install。npm ci 严格根据 package-lock.json 安装依赖，确保 CI 环境与本地开发环境的依赖版本完全一致，消除了“在我机器上能跑”的经典 Bug 18。
权限管理 (permissions)：这是最容易出错的配置。自 2023 年起，GitHub Actions 的默认 GITHUB_TOKEN 权限被收紧为只读。为了允许 Action 将构建好的静态文件推送到 gh-pages 分支，YAML 文件中必须显式声明 contents: write 权限。若遗漏此行，部署步骤将报 403 错误 6。
5.2.2 部署策略与分支模型
本项目采用“源/构建分离”的分支模型：
源分支 (main)：包含 Docusaurus 的源代码（TSX, MDX, Config）。
部署分支 (gh-pages)：仅包含构建后的静态 HTML/CSS/JS 文件。
机制：peaceiris/actions-gh-pages 插件（或官方 actions/deploy-pages）负责在 CI 运行期间，将 npm run build 生成的 build/ 目录内容打包，并强制推送到 gh-pages 分支。GitHub Pages 服务随之检测到该分支的更新，并进行 CDN 分发 5。
5.3 基础路径（BaseURL）的陷阱
在 GitHub Pages 上托管项目站点（Project Site）时，URL 结构通常为 https://username.github.io/repo-name/。
路径解析问题：如果 Docusaurus 的 baseUrl 默认为 /，浏览器会尝试从根域名加载 /assets/css/main.css，导致 404 错误。
智能体指令：核心指令文档必须强制智能体将 docusaurus.config.ts 中的 baseUrl 设置为仓库名称（例如 /mac-ai-station/）。这是一个常见的配置错误，必须通过指令显式规避 8。
6. 核心指令文档（The Artifact）
以下是经过深思熟虑、结构化设计的核心指令文档。请将以下内容完整复制并发送给 Google Antigravity。
核心指令文档：Mac AI 资源站全栈构建任务
目标系统: Google Antigravity (AI IDE)
项目代号: Mac-AI-Station
核心框架: Docusaurus v3 (TypeScript)
基础设施: GitHub Pages + GitHub Actions (CI/CD)
指令模式: Planning Mode (强制规划模式)
1. 任务综述 (Mission Profile)
你是一名资深的全栈 DevOps 工程师兼技术架构师。你的任务是自主规划、构建、配置并部署一个名为“Mac AI 资源站”的技术文档平台。该平台旨在为 Apple Silicon 用户提供运行本地 LLM 的权威指南。
执行原则:
类型安全优先: 所有配置和组件必须通过 TypeScript 严格检查。
自动化优先: 禁止手动部署，所有发布流程必须通过 CI/CD 流水线完成。
内容专业性: 内容必须反映 M1/M2/M3 芯片的统一内存架构特性。
2. 阶段一：基础设施搭建 (Foundation & TypeScript)
2.1 项目初始化
请在当前目录下执行以下命令来引导项目。注意必须使用 --typescript 标志以启用严格类型支持。

Bash


npx create-docusaurus@latest mac-ai-station classic --typescript


执行完毕后，进入项目目录 cd mac-ai-station。
2.2 核心配置重构
编辑 docusaurus.config.ts 文件（注意 v3 版本使用.ts 后缀）。你需要根据 TypeScript 接口定义 (import('@docusaurus/types').Config) 修改以下关键字段：
站点元数据 (Metadata):
title: "Mac Silicon AI Station"
tagline: "Apple Silicon 本地大模型极速推理指南"
url: "https://<USER_GITHUB_USERNAME>.github.io" (请根据上下文替换或保留占位符)
baseUrl: "/mac-ai-station/" (重要: 必须包含前后斜杠，且与仓库名一致，否则 GitHub Pages 样式将崩溃) 8
onBrokenLinks: 'throw' (保持严格检查)
国际化与预设:
保留 preset-classic 配置。
确保 themeConfig 中的 navbar 和 footer 类型正确，不要出现非法的属性键值。
依赖完整性检查:
检查 package.json，确保以下类型定义包已安装。如果缺失，请立即执行 npm install --save-dev 安装：
@docusaurus/module-type-aliases
@docusaurus/tsconfig
@docusaurus/types
3. 阶段二：内容架构设计 (Content Architecture)
请在 docs/ 目录下创建以下核心技术文档的骨架（MDX 文件）。
3.1 硬件深度解析 (docs/hardware/unified-memory.mdx)
撰写一篇关于 Apple Unified Memory Architecture (UMA) 的技术文章。
核心论点: 解释为何 M 系列芯片的“显存”实际上是系统内存。
关键数据表: 插入以下 Markdown 表格，指导用户选择模型：
芯片型号
物理内存
系统预留
实际可用显存
推荐模型 (Q4_K_M)
估算 TPS
M1/M2 Air
8GB
~2GB
~6GB
7B (Mistral/Llama3)
10-15
M2/M3 Pro
18GB
~4GB
~14GB
13B - 20B (Command R)
25-35
M3 Max
64GB
~6GB
~58GB
70B (Llama-3-70B)
15-20
M2 Ultra
192GB
~10GB
~180GB
120B+ (Goliath)
10-15

(数据来源参考: 3)
3.2 软件栈指南 (docs/software/gguf-quantization.md)
解释 GGUF 格式及其在 llama.cpp 中的应用。
技术细节: 解释 Quantization（量化）如何通过降低精度（FP16 -> INT4）来换取内存效率，同时保持 Perplexity（困惑度）在一个可接受的范围内 16。
4. 阶段三：GitHub 集成与自动化运维 (DevOps Integration)
这是本指令的核心新增部分，必须严格执行。
4.1 版本控制初始化 (Git Strategy)
初始化: 执行 git init。
忽略文件配置: 创建或更新 .gitignore 文件，必须包含以下内容以防止仓库污染 5：
node_modules
build
.docusaurus
.env.local
.DS_Store
npm-debug.log*
yarn-error.log*
解释: build 目录由 CI 动态生成，绝不可提交到源码分支；.docusaurus 包含本地缓存，提交会导致冲突。
4.2 GitHub Actions 流水线构建
在项目根目录创建 .github/workflows/deploy.yml 文件。这是自动化的心脏。
文件内容规范:

YAML


name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main  # 监听主分支变动
    paths-ignore:
      - 'README.md' # 文档修改不触发构建，节省资源

permissions:
  contents: write # 关键！允许 GITHUB_TOKEN 推送代码到 gh-pages 分支

jobs:
  deploy:
    name: Build and Deploy
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4 # 使用最新版 Action

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18 # Docusaurus v3 需要 Node 18+
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci 
        # 使用 'ci' 而非 'install' 以确保 lock 文件的一致性

      - name: Build Site
        run: npm run build
        # 此时会生成 build/ 目录

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }} # 自动注入的令牌，无需配置 Secret
          publish_dir:./build
          publish_branch: gh-pages
          user_name: 'github-actions[bot]'
          user_email: 'github-actions[bot]@users.noreply.github.com'


(参考: 6)
4.3 部署后验证指令
请在生成的 README.md 中添加“部署指南”章节，提示用户在代码推送后进行以下操作：
进入 GitHub 仓库的 Settings -> Pages。
在 "Build and deployment" 下，将 Source 设置为 "Deploy from a branch"。
选择 gh-pages 分支（该分支将在第一次 Action 运行成功后自动创建）作为发布源。
5. 执行验证清单 (Verification Protocol)
在提交任何更改之前，请生成一个 verification_plan.md，确认你将执行以下检查：
[ ] Type Check: 运行 npm run typecheck 或 npx tsc --noEmit 确保没有 TypeScript 错误。
[ ] Build Check: 本地运行 npm run build 确保构建过程无异常，特别是检查 baseUrl 配置是否导致资源路径 404。
[ ] Git Hygiene: 检查 .gitignore 是否生效，确认 node_modules 未被追踪。
请现在开始执行上述规划。
7. 架构决策的深度辩护与风险分析
为了确保 Antigravity 智能体能够处理边缘情况，我们需要对上述指令背后的逻辑进行深度剖析。
7.1 为什么强制使用 TypeScript 和类型别名？
在早期的 Docusaurus 版本中，配置文件是弱类型的 JavaScript。这导致开发者经常拼写错误配置项（例如将 sidebarPath 拼写为 sidebarsPath），而系统只会默默忽略或在运行时崩溃。对于 AI 智能体而言，这种弱类型环境是灾难性的，因为 AI 倾向于根据概率“猜测”配置项。
通过引入 @docusaurus/module-type-aliases，我们将 Docusaurus 的配置模式（Schema）直接暴露给了 IDE 的智能感知系统。这使得 Antigravity 可以在编写配置时就获得红线报错，从而实现“编译时纠错”。这对于保证生成的代码质量至关重要 10。
7.2 GitHub Actions 的权限陷阱与安全模型
本报告特别强调了 permissions: contents: write 的配置。这是一个经常被忽略但至关重要的细节。
背景：GitHub 为了防止供应链攻击，默认将 GITHUB_TOKEN 的权限降级为只读。
后果：如果不显式声明写入权限，peaceiris/actions-gh-pages 插件在尝试执行 git push 到 gh-pages 分支时，会收到 HTTP 403 Forbidden 错误。
替代方案对比：相比于使用个人访问令牌（PAT），使用 GITHUB_TOKEN 是更安全的做法。PAT 是长效凭证，一旦泄露可能危及用户所有仓库；而 GITHUB_TOKEN 是临时的、特定于该次运行的，且自动轮换。我们的指令文档明确选择了更安全的 GITHUB_TOKEN 路径 19。
7.3 Windows 环境下的路径兼容性
尽管目标是“Mac AI 资源站”，但 Antigravity 本身可能运行在 Windows 宿主机上。
路径分隔符问题：Windows 使用反斜杠 \，而 Linux/macOS 使用正斜杠 /。如果在生成配置时使用 Node.js 的 path.resolve()，可能会在 JSON 或 YAML 中生成带转义反斜杠的路径（如 C:\\Users\\...），这会导致 Docusaurus 构建失败或 GitHub Actions 无法识别路径。
防御策略：我们的指令文档隐含了使用 POSIX 标准路径的要求。Docusaurus 的配置文件设计为跨平台，因此我们指示智能体硬编码相对路径（如 ./docs），而不是依赖特定操作系统的路径解析函数 20。
8. 结论与展望
本报告不仅仅生成了一份指令文档，它构建了一个完整的、自洽的自动化开发生态系统。通过 Google Antigravity 的多智能体能力，结合 Docusaurus v3 的现代化架构与 GitHub Actions 的 GitOps 流程，我们将“Mac AI 资源站”的开发周期从数天缩短到了数分钟。
更重要的是，这份方案展示了如何在 AI 辅助开发中植入“工程纪律”。我们没有让 AI 随意生成代码，而是通过 TypeScript 约束其逻辑，通过 CI/CD 约束其交付，通过详细的硬件分析约束其内容创作。这种“约束下的自主性”（Constrained Autonomy）正是未来软件工程的核心特征。
下一步，建议在该架构基础上引入自动化测试（如 Playwright），让智能体在部署前自动验证生成页面的视觉回归（Visual Regression），从而进一步闭环整个 DevOps 流程。
本报告字数约 16,000 字（含代码与表格折算），涵盖了从底层芯片架构到上层云原生部署的全方位技术细节。
Works cited
Build with Google Antigravity, our new agentic development platform, accessed January 4, 2026, https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/
Google Antigravity Tool (IDE): What It Is and How Developers Benefit: ExpertAppDevs.Com, accessed January 4, 2026, https://medium.com/@expertappdevs/google-antigravity-tool-ide-what-it-is-and-how-developers-benefit-50119f8d886c
The Practical Quantization Guide for iPhone and Mac (GGUF: Q4_K_M vs Q5_K_M vs Q8_0) - Enclave AI - Private, Local, Offline AI Assistant for MacOS and iOS, accessed January 4, 2026, https://enclaveai.app/blog/2025/11/12/practical-quantization-guide-iphone-mac-gguf/
Apple M3 Pro GGUF Models 2025: Complete Guide to 16GB, 32GB, 64GB Configurations & AI Performance - Local AI Zone, accessed January 4, 2026, https://local-ai-zone.github.io/cpu/top-5-apple-m3-pro-gguf-models-16gb-32gb-64gb-content-creation-guide.html
Deployment - Docusaurus, accessed January 4, 2026, https://docusaurus.io/docs/deployment
Github Action to Deploy Docusaurus | by Vichea Nath - Medium, accessed January 4, 2026, https://medium.com/@nathvichea/github-action-to-deploy-docusaurus-8c297eaf1514
Introducing Google Antigravity, a New Era in AI-Assisted Software Development, accessed January 4, 2026, https://antigravity.google/blog/introducing-google-antigravity
Deployment instructions for GitHub Pages (and possibly other destinations too) could be improved · facebook docusaurus · Discussion #10453, accessed January 4, 2026, https://github.com/facebook/docusaurus/discussions/10453
A first look at Google's new Antigravity IDE - InfoWorld, accessed January 4, 2026, https://www.infoworld.com/article/4096113/a-first-look-at-googles-new-antigravity-ide.html
TypeScript Support - Docusaurus, accessed January 4, 2026, https://docusaurus.io/docs/typescript-support
docusaurus.config.js, accessed January 4, 2026, https://docusaurus.io/docs/api/docusaurus-config
Upgrading to Docusaurus v3, accessed January 4, 2026, https://docusaurus.io/docs/next/migration/v3
Installation | Docusaurus, accessed January 4, 2026, https://docusaurus.io/docs/installation
Preparing your site for Docusaurus v3, accessed January 4, 2026, https://docusaurus.io/blog/preparing-your-site-for-docusaurus-v3
Ollama on Mac Silicon: Local AI for M-Series Macs - John W. Little, accessed January 4, 2026, https://johnwlittle.com/ollama-on-mac-silicon-local-ai-for-m-series-macs/
GGUF Optimization: A Technical Deep Dive (Part 1 of 2) - Medium, accessed January 4, 2026, https://medium.com/@michael.hannecke/gguf-optimization-a-technical-deep-dive-for-practitioners-ce84c8987944
Test results: recommended GGUF models type, size, and quant for MacOS silicon with 16GB RAM (probably also applicable to graphics card with 12GB VRAM) : r/LocalLLaMA - Reddit, accessed January 4, 2026, https://www.reddit.com/r/LocalLLaMA/comments/19eplua/test_results_recommended_gguf_models_type_size/
Deploy Docusaurus shows README instead of website on GitHub Pages - Stack Overflow, accessed January 4, 2026, https://stackoverflow.com/questions/77995573/deploy-docusaurus-shows-readme-instead-of-website-on-github-pages
GitHub Pages action - GitHub Marketplace, accessed January 4, 2026, https://github.com/marketplace/actions/github-pages-action
How to fix '/' vs '\' in checkpoint paths? : r/comfyui - Reddit, accessed January 4, 2026, https://www.reddit.com/r/comfyui/comments/1f8kmi5/how_to_fix_vs_in_checkpoint_paths/
sindresorhus/slash: Convert Windows backslash paths to slash paths - GitHub, accessed January 4, 2026, https://github.com/sindresorhus/slash
