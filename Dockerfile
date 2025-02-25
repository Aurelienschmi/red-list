FROM node:23-alpine3.20

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY public ./public
COPY src ./src
COPY test ./test

# RUN npm run test

ENTRYPOINT [ "npm" ]
CMD [ "run", "dev" ]