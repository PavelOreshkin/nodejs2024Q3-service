FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["sh", "-c", "npm run migration:run && npm run start:dev"]