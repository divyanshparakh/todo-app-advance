# build environment

FROM node:20-alpine as builder
WORKDIR /app
# Copy package.json + package-lock.json files
COPY package*.json ./
# Installing dependencies
RUN npm install
# Bundle app source 
COPY . .
RUN npm run build


# production environment

FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]