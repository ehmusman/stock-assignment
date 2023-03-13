FROM node:18-alpine3.16
WORKDIR /app
RUN apk add jq
RUN npm install -g typescript
COPY package.json ./
RUN npm install
COPY . .
RUN npm run test
CMD [ "npm", "start", "CLQ274846/07/46", "SXB930757/87/87","PGL751486/42/83" ]
