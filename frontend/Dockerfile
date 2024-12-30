FROM node:19-slim as build
WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install -g @angular/cli
RUN npm install --force
RUN ng build --configuration=production

CMD ["node", "index.js"]
