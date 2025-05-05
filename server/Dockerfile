# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Install production dependencies only
RUN npm prune --production

# Production stage
FROM node:18-alpine

WORKDIR /app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy built node modules and source code
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/ ./

# Create necessary directories
RUN mkdir -p /app/uploads && \
    chown -R appuser:appgroup /app

# Set environment variables
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Set working directory and user
WORKDIR /app
USER appuser

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

# Start the application
CMD ["npm", "start"]
