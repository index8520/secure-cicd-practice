FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
FROM node:18-alpine AS runtime
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=build /app /app
RUN chown -R appuser:appgroup /app
USER appuser
ENV NODE_ENV=production PORT=3000
EXPOSE 3000
CMD ["node", "app.js"]
