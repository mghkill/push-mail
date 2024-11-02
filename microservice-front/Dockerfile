FROM node:latest

RUN apt update && apt -yq upgrade && apt install -yq build-essential libpq-dev openssl && rm -rf /var/lib/apt/lists/*

ENV TZ="America/Sao_Paulo"

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn", "start"]

EXPOSE 3000