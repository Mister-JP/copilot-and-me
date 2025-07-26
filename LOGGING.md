# Production Logging Configuration

## Environment Variables

NODE_ENV=production LOG_LEVEL=info LOG_FORMAT=json

## Deployment Logging Setup

### Docker Production

```dockerfile
# Structured logging for containers
ENV NODE_ENV=production
ENV LOG_LEVEL=info
CMD ["npm", "start", "2>&1", "|", "jq", "-r", "."]
```

### PM2 Production

```json
{
  "name": "copilot-and-me",
  "script": "npm start",
  "log_type": "json",
  "merge_logs": false,
  "log_date_format": "YYYY-MM-DD HH:mm:ss Z"
}
```

### systemd Service

```ini
[Service]
StandardOutput=journal
StandardError=journal
SyslogIdentifier=copilot-and-me
```

## Log Monitoring

### CloudWatch (AWS)

- Structured JSON logs automatically parsed
- Set up log retention: 30 days
- Create dashboards for error rates

### Datadog

```bash
# Forward logs with structured parsing
source nodejs
service copilot-and-me
```

### ELK Stack

- Elasticsearch index: `copilot-and-me-*`
- Kibana visualizations for performance metrics
- Logstash pipeline for log processing

## Production Best Practices

1. **Zero console.log** - All logging through structured logger
2. **JSON format** - Machine readable, searchable
3. **Request tracing** - Unique request IDs
4. **Performance metrics** - Response times, content sizes
5. **Error context** - Stack traces with sanitized data
6. **Log rotation** - Prevent disk space issues
7. **Security** - No sensitive data in logs

## Genius Simplicity Achieved ✨

- One logger class, zero dependencies
- Dev: Human readable colors
- Prod: Structured JSON
- Minimal performance impact
- Professional monitoring ready
