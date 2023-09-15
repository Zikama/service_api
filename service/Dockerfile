FROM --platform=linux/amd64 node:lts-alpine

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production

COPY . .
CMD ["node", "index.js"]
EXPOSE 8080