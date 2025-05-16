FROM node:20-alpine as dev
ENV NODE_ENV dev

WORKDIR /app
RUN chown node:node ./
USER node

COPY --chown=node:node package*.json ./
RUN npm install

COPY . .

RUN npm run build
