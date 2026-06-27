FROM node:20

WORKDIR /PROJETO API

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g serve

EXPOSE 5173

CMD ["serve", "-s", "./html", "-l", "5173"]