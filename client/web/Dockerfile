FROM node:20

RUN mkdir /remix 

WORKDIR /remix

COPY package*.json ./

RUN npm i

COPY . .

ENV PUBLIC_DOMAIN=http://127.0.0.1:8000
ENV CURRENT_DOMAIN=http://127.0.0.1:3000

EXPOSE 3000

RUN npm run build

CMD [ "npm", "run", "start" ]