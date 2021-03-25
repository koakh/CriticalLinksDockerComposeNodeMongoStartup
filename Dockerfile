# node
# https://hub.docker.com/_/node/

# Official Docker Image for Node.js
# https://github.com/nodejs/docker-node

# Docker and Node.js Best Practices
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md

# Dockerizing a Node.js web app
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

# base image
FROM node:10.23-alpine

# environment
ENV NPM_CONFIG_LOGLEVEL info

# packages
# RUN apk add --no-cache --virtual \
#         g++ \
#         gcc \
#         gnupg \
#         libgcc \
#         linux-headers

# packages
RUN apk add --no-cache \
        make \
        curl \
        git

# create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY node-client/package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY node-client/ .

# replace this with your application's default port
EXPOSE 3000

CMD [ "npm", "start" ]
