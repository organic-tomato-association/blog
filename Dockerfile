FROM node:14
ENV NODE_ENV=development
WORKDIR /app
RUN npm install
EXPOSE 3000
