FROM node:16

ENV DATABASE_URL="postgresql://ng_cash_user:ng_cash_pass@postgres:5432/ng_cash_db"
ENV PORT=3333

WORKDIR /ng_cash_app

COPY package.json ./

COPY ./ ./

RUN npm install && npm run build 

EXPOSE 3000

CMD ["npm","start"]