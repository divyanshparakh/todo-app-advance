FROM node:20-alpine
WORKDIR /app
# Copy package.json + package-lock.json files
COPY package*.json ./
# Installing dependencies
RUN npm install
# Bundle app source 
COPY . .
ENTRYPOINT [ "npm", "start" ]