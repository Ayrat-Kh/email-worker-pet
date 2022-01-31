FROM node:16

ENV PORT 3000

# Create app directory
WORKDIR /usr/app

# Installing dependencies
COPY package*.json /usr/app/
RUN yarn

# Copying source files
COPY . /usr/app

RUN yarn run db:generate

# Building app
RUN yarn run build
EXPOSE 3000

# Running the app
CMD "yarn" "db:push" && "yarn" "start"