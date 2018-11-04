FROM node:8

WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

ENV PORT 80
ENV PHOTO_DIR /photos

VOLUME /photos
EXPOSE 80

CMD [ "node", "server.js" ]