# Mac AI Pilot

> **The Missing Manual for Local AI on Apple Silicon**

A comprehensive documentation site for running AI models locally on Apple Silicon Macs (M1/M2/M3).

## 🚀 Features

- **Beginner-Friendly Guides**: Step-by-step tutorials for non-technical users
- **Technical Deep-Dives**: GGUF quantization, memory optimization, model selection
- **Interactive Tools**: RAM Calculator to find the right model for your Mac
- **Native App Guides**: Draw Things, Pinokio, and more
- **Auto-Deployment**: GitHub Actions CI/CD pipeline included

## 📖 Documentation Sections

| Section | Description |
|---------|-------------|
| **Start Here** | Introduction and getting started |
| **App Lab** | Setup guides for AI applications |
| **Model Vault** | GGUF model guides and downloads |
| **Workflows** | Weekly tips and tutorials |

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The site will be available at `http://localhost:3000/mac-ai-hub/`

## 🚀 Deployment

See [GITHUB_SETUP.md](./GITHUB_SETUP.md) for instructions to deploy to GitHub Pages.

## 📁 Project Structure

```
mac-ai-hub/
├── docs/
│   ├── intro.md           # Welcome page
│   ├── apps/              # Application guides
│   │   ├── setup-guide.mdx
│   │   ├── draw-things.mdx
│   │   └── pinokio.mdx
│   └── models/            # Model guides
│       ├── gguf-basics.mdx
│       └── top-models.mdx
├── blog/                  # Workflows/blog posts
├── src/
│   └── components/
│       └── RamCalc.tsx    # Interactive RAM Calculator
├── docusaurus.config.ts   # Site configuration
└── .github/workflows/     # CI/CD pipeline
```

## 🔧 Tech Stack

- **Framework**: [Docusaurus v3](https://docusaurus.io/)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Deployment**: GitHub Pages + GitHub Actions

## 📄 License

MIT License - feel free to use this project as a template for your own documentation sites.

---

Built with ❤️ for the Apple Silicon AI community.
