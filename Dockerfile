FROM node:10.17

ENV PORT=3000

COPY . /var/www

WORKDIR /var/www

VOLUME ["/var/www"]

EXPOSE $PORT

RUN npm install

CMD ["npm", "start"]