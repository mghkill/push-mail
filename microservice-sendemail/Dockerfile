FROM node:latest

RUN apt update && apt -yq upgrade && apt install -yq build-essential libpq-dev openssl && rm -rf /var/lib/apt/lists/*

ENV TZ="America/Sao_Paulo"

WORKDIR /apiNode

COPY package*.json ./

RUN npm install

# COPY .env .env

# ENV $(cat .env | tr '\n' ' ')

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000