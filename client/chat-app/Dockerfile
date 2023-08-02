FROM node:19.6.0
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app
EXPOSE 3000
CMD [ "npm", "start" ]