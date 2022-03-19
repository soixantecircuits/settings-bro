FROM node:8.9.1-alpine
WORKDIR /app
COPY ./ ./
RUN npm install
CMD [ "npm", "start" ]
