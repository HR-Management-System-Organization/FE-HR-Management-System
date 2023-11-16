# Stage 1: Build React App
FROM node:18.18.2 as build

WORKDIR /app

COPY package.json ./

RUN npm install --force

COPY . .

RUN npm run build

# Stage 2: Serve React App with Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 4002

CMD ["nginx", "-g", "daemon off;"]
