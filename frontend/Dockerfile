FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g serve

EXPOSE 5173

CMD ["serve", ".", "-l", "5173"]