FROM node:21

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

ENV ADDRESS=0.0.0.0 PORT=8080

RUN npm run build

CMD ["npm", "start"]