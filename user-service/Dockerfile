# FROM node:alpine As development
FROM node:18 As development

RUN apt-get update && apt-get install -y openssl

WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install -g npm@10.1.0
RUN npm install

COPY  . .
# COPY --chown=node:node . .


RUN npm run build user


CMD ["node", "dist/apps/user/main"]


