# 🔄 LOG ROTATION SYSTEM - GENIUS SIMPLICITY

## ✨ Features Implemented

### **Automatic Log Rotation**

- **File Size Limit:** 10MB per log file
- **Time Retention:** Last 7 days only
- **Daily Files:** One file per day (app-YYYY-MM-DD.log)
- **Auto Cleanup:** Removes files older than 7 days
- **Size Rotation:** Creates timestamped files when 10MB reached

### **Production Directory Structure**

```
logs/
├── app-2025-07-25.log          # Today's logs
├── app-2025-07-24.log          # Yesterday
├── app-2025-07-23.log          # Day -2
└── app-2025-07-25-14-30-15.log # Rotated file (if >10MB)
```

### **Log Entry Format (JSON)**

```json
{
  "level": "info",
  "message": "Repository listing completed",
  "timestamp": "2025-07-25T14:30:15.123Z",
  "context": {
    "duration": "45ms",
    "repoCount": 44
  }
}
```

## 🚀 Usage Examples

### **Development**

```bash
npm run dev
# Logs to console with colors, no files created
```

### **Production**

```bash
npm run build && npm run start
# Logs to console (JSON) + rotating files in logs/
```

### **Log Management API**

```bash
# Check log stats
curl http://localhost:3000/api/logs

# Manual cleanup (remove old files)
curl -X POST http://localhost:3000/api/logs
```

## ⚙️ Configuration

### **Customizable Settings**

```typescript
// In lib/rotating-logger.ts
private maxFileSize = 10 * 1024 * 1024 // 10MB
private maxDays = 7 // Keep last 7 days
```

### **Environment Variables**

```bash
NODE_ENV=production  # Enables file logging
LOG_LEVEL=info       # Minimum log level
```

## 📊 Monitoring Integration

### **Log Analysis Commands**

```bash
# Count entries by level
grep '"level":"error"' logs/app-*.log | wc -l

# Performance analysis
grep '"duration"' logs/app-*.log | tail -100

# Daily log summary
jq -r '.level' logs/app-$(date +%Y-%m-%d).log | sort | uniq -c
```

### **Production Deployment**

```dockerfile
# Dockerfile
COPY . .
RUN npm run build
VOLUME /app/logs
CMD ["npm", "start"]
```

### **systemd Service**

```ini
[Service]
WorkingDirectory=/opt/copilot-and-me
ExecStart=/usr/bin/npm start
Restart=always
StandardOutput=journal
StandardError=journal
```

## 🎯 Benefits Achieved

### **Automatic Management**

- ✅ **Zero maintenance** - Runs automatically
- ✅ **Disk protection** - Never fills up storage
- ✅ **Historical data** - 7 days of complete logs
- ✅ **Performance tracking** - All requests timed
- ✅ **Error monitoring** - Full error context captured

### **Production Ready**

- ✅ **JSON structured** - Machine parseable
- ✅ **Timestamp precision** - ISO format with milliseconds
- ✅ **Context enriched** - Performance and error details
- ✅ **Size controlled** - 10MB max per file
- ✅ **Time bounded** - 7 day automatic cleanup

## 🔥 Genius Simplicity

- **One class** - Complete log rotation system
- **Zero dependencies** - Pure Node.js FS operations
- **Minimal config** - Just size and days limits
- **Auto cleanup** - Set it and forget it
- **Dev friendly** - Colored console in development
- **Prod optimized** - JSON structured for monitoring

**Perfect for long-running production applications!** 🚀
