# 1) Build stage
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2) Nginx stage
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# ⬇⬇ THIS is the right path for YOUR project
COPY --from=build /app/dist/days-alive-ui-src/browser /usr/share/nginx/html


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
