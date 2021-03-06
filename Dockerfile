FROM node:10.17

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]