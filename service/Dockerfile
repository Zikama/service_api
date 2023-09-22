FROM --platform=linux/amd64 node:lts-alpine

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --omit=dev

COPY . .
CMD ["node", "index.js"]
EXPOSE 8080