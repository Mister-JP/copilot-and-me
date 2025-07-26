# Code Quality & Formatting Guide

## 🛠️ Linting & Formatting Setup

### Tools

- **ESLint**: TypeScript/JavaScript linting with Next.js optimizations
- **Prettier**: Consistent code formatting
- **TypeScript**: Type checking and validation

### Configuration Files

- `.eslintrc.json` - ESLint rules and TypeScript integration
- `.prettierrc.json` - Code formatting preferences
- `.prettierignore` - Files to exclude from formatting

## 📝 Available Commands

### Development Workflow

```bash
# Start development server
npm run dev

# Validate all code (type-check + lint + format)
npm run validate

# Auto-fix linting and formatting issues
npm run fix

# Pre-commit validation
npm run precommit
```

### Individual Tasks

```bash
# Linting
npm run lint              # Check for linting errors
npm run lint:fix          # Auto-fix linting errors

# Formatting
npm run format            # Format all files
npm run format:check      # Check formatting without changes

# Type checking
npm run type-check        # TypeScript validation

# Build & production
npm run build             # Production build
npm run prod              # Build + start production server
```

### Maintenance

```bash
# Clean build artifacts
npm run clean

# Fresh install and build
npm run fresh
```

## 🔧 ESLint Configuration

### Key Rules

- **TypeScript**: Strict type checking and modern practices
- **Unused variables**: Error on unused vars (prefix with `_` to ignore)
- **Console statements**: Warn on `console.log` (allow `warn`/`error`)
- **Code style**: Enforced by Prettier integration
- **Next.js**: Core web vitals and React best practices

### Ignored Patterns

- `.next/`, `node_modules/`, build directories
- `*.config.js` files
- `repo_analysis/` directory

## 🎨 Prettier Configuration

### Format Style

- **Quotes**: Single quotes
- **Semicolons**: Always
- **Trailing commas**: ES5 compatible
- **Line width**: 80 characters
- **Indentation**: 2 spaces
- **End of line**: LF (Unix)

### File-Specific Rules

- **JSON**: 120 character line width
- **Markdown**: 100 characters, prose wrap

## 🚀 VS Code Integration

### Recommended Extensions

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### Auto-Format Settings

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "typescript", "javascriptreact", "typescriptreact"]
}
```

## 🔍 Pre-Commit Workflow

### Manual Check

```bash
npm run precommit
```

### Automated (Git Hooks)

Install husky for automated pre-commit validation:

```bash
npm install --save-dev husky
npx husky install
npx husky add .husky/pre-commit "npm run precommit"
```

## 🐛 Troubleshooting

### Common Issues

#### ESLint Errors

```bash
# Check specific file
npx eslint app/page.tsx

# Fix automatically
npm run lint:fix
```

#### Prettier Conflicts

```bash
# Check formatting
npm run format:check

# Apply formatting
npm run format
```

#### Type Errors

```bash
# Check types
npm run type-check

# View detailed errors
npx tsc --noEmit --pretty
```

### Performance

- **Large projects**: Use `--cache` flag for faster linting
- **CI/CD**: Run `npm run validate` in build pipeline
- **Development**: Enable auto-fix on save in editor

## 📊 Quality Metrics

### Success Criteria

- ✅ Zero ESLint errors
- ✅ Zero TypeScript errors
- ✅ Consistent Prettier formatting
- ✅ Clean production build
- ✅ No console.log in production

### Monitoring

```bash
# Check overall health
npm run validate && echo "✅ Code quality passed"

# Pre-deployment validation
npm run build && npm run validate
```
