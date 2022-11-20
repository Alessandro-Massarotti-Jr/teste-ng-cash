FROM node:16

ENV VITE_API_URL='http://127.0.0.1:3333'

WORKDIR /ng_cash_client

COPY package.json ./

COPY ./ ./

RUN npm install

EXPOSE 3000

CMD ["npm","run dev"]