FROM node:18.6.0

WORKDIR /serve

COPY package.json package.json

COPY yarn.lock yarn.lock

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
