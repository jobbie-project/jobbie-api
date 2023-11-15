FROM node:18.14-alpine AS base

# Create app directory
WORKDIR /usr/src/app

COPY . ./
RUN yarn install
RUN yarn postinstall
RUN yarn build

EXPOSE 1337

ENV MODE=production

CMD yarn migration:run && node --max_old_space_size=450 dist/src/main.js