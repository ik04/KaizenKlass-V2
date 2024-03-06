FROM node:20

WORKDIR /app/
COPY package*.json ./
RUN npm install

COPY . .

ENV PUBLIC_DOMAIN=http://127.0.0.1:8000
ENV CURRENT_DOMAIN=http://127.0.0.1:3000

EXPOSE 3000

CMD [ "npm","run","dev" ]