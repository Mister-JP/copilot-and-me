# 🤖 Copilot & Me - AI Repository Analyzer

> **A sophisticated dashboard for AI-powered repository analysis and context management**

[![Next.js](https://img.shields.io/badge/Next.js-14.2.30-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

## ✨ Features

### 🧠 **Intelligent Memory Management**

- Persistent notepad for maintaining AI context across sessions
- Seamless integration with AI workflows

### 📋 **Instructions Hub**

- Centralized management of AI directives and guidelines
- Version-controlled instruction sets
- Dynamic content loading and updates

### 🗂️ **Repository Analysis**

- Monitor and analyze repository structures in real-time
- Support for multiple repository tracking
- Automated discovery and cataloging

### 📊 **Production-Grade Logging**

- Automatic log rotation with configurable size limits
- Atomically-written log entries to prevent race conditions
- Comprehensive request tracking and performance metrics
- Self-cleaning log management (7-day retention)

### 🎨 **Modern Dark-Themed UI**

- Clean, minimal interface optimized for developer workflows
- Responsive design with mobile support
- Settings panel for real-time configuration

## 🛠️ Tech Stack

| Category         | Technology                          |
| ---------------- | ----------------------------------- |
| **Frontend**     | Next.js 14, React 18, TypeScript 5+ |
| **Styling**      | Tailwind CSS, Custom Components     |
| **Backend**      | Next.js API Routes, Node.js         |
| **Logging**      | Custom Rotating Logger with JSON    |
| **Code Quality** | ESLint, Prettier, Strict TypeScript |
| **Development**  | Hot Reload, Build Optimization      |

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Mister-JP/copilot-and-me.git
cd copilot-and-me

# Install dependencies
npm install

# Start development server
npm run dev
# → Opens http://localhost:3000

# Build for production
npm run build

# Run all quality checks
npm run validate
```

## 📡 API Reference

### Core Endpoints

| Endpoint            | Method | Description                      | Response           |
| ------------------- | ------ | -------------------------------- | ------------------ |
| `/api/memory`       | GET    | Access persistent memory notes   | Plain text content |
| `/api/instructions` | GET    | Retrieve AI instructions         | Plain text content |
| `/api/repos`        | GET    | List repository analysis data    | JSON array         |
| `/api/logs`         | GET    | Log system health and statistics | JSON with metrics  |
| `/api/logs`         | POST   | Trigger manual log cleanup       | JSON confirmation  |

### Response Examples

```json
// GET /api/logs
{
  "status": "healthy",
  "logRotation": {
    "enabled": true,
    "maxDays": 7,
    "maxFileSize": "10MB",
    "currentStats": {
      "fileCount": 1,
      "totalSize": "0.01MB",
      "files": ["app-2025-07-26.log"]
    }
  },
  "timestamp": "2025-07-26T04:08:37.323Z"
}
```

## 📚 Documentation

| Document                                   | Description                              |
| ------------------------------------------ | ---------------------------------------- |
| [Code Quality Guidelines](CODE_QUALITY.md) | Development standards and best practices |
| [Logging Architecture](LOGGING.md)         | Comprehensive logging system docs        |
| [Log Rotation Details](LOG_ROTATION.md)    | File rotation and cleanup mechanisms     |

## 🏗️ Architecture

### System Design

```text
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend UI   │    │   API Routes     │    │  File System    │
│   (React/Next)  │◄──►│  (Backend Logic) │◄──►│ (Data Storage)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
    Tailwind CSS          Logging System          Rotating Logs
    Settings Panel        Error Handling          Memory Notes
    Real-time Updates     Performance Metrics     Repository Data
```

### Key Principles

- **Clean Separation**: Frontend UI completely separated from backend logic
- **Production Ready**: Enterprise-grade logging with automatic management
- **Developer Friendly**: Hot reload, strict typing, automated quality checks
- **Scalable Architecture**: Designed for growth and feature expansion

## 🔧 Development

### Code Quality Standards

- **TypeScript**: Strict mode enabled with comprehensive type checking
- **ESLint**: Custom rules for Next.js, React, and TypeScript
- **Prettier**: Automated code formatting with consistent style
- **Git Hooks**: Pre-commit validation ensures code quality

### Available Scripts

```bash
npm run dev         # Start development server with hot reload
npm run build       # Create optimized production build
npm run start       # Start production server
npm run lint        # Run ESLint with auto-fix
npm run format      # Format code with Prettier
npm run validate    # Run all quality checks (lint + format + type check)
```

### Configuration Features

- **Configurable Sync Latency**: Test different network conditions via UI
- **Backend-Only Logging**: Clean frontend with comprehensive backend monitoring
- **Smart Ignore Patterns**: Automatic exclusion of build artifacts and analysis data
- **Hot Module Replacement**: Instant updates during development

## 🏃‍♂️ Performance

- ⚡ **Sub-second API responses** with comprehensive logging
- 🔄 **Automatic log rotation** prevents disk space issues
- 🧹 **Self-cleaning architecture** with 7-day retention policy
- 📈 **Performance metrics** built into every request

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with proper testing
4. Run `npm run validate` to ensure code quality
5. Commit with conventional commit messages
6. Push to your branch and open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for AI-powered development workflows**

[Report Bug](../../issues) · [Request Feature](../../issues) · [Documentation](../../wiki)
