FROM node:18.6.0

WORKDIR /app/booking

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
