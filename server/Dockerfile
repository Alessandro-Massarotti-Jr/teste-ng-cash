FROM node:16

ENV DATABASE_URL="postgresql://ng_cash_user:ng_cash_pass@host.docker.internal:5432//ng_cash_db"
ENV PORT=3333
ENV JWT_SECRET="azzsdgdsgsgregea"

WORKDIR /app/ng_cash_server

COPY package.json ./

COPY . .

RUN npm install

EXPOSE 3333

RUN npm run migrate

CMD ["npm","run","dev"]