FROM node:16

# Create app directory

WORKDIR /serve

# Install app dependencies
COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "yarn", "dev" ]
