FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY index.js ./
COPY routes ./routes
COPY data ./data
COPY middleware ./middleware

EXPOSE 3000

CMD ["node", "index.js"]
