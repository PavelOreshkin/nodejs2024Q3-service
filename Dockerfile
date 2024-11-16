FROM node:22-alpine

LABEL maintainer="pavel.oreshkin.1@gmail.com"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npm run migration:run"]

ENTRYPOINT ["npm", "run", "start:dev"]
