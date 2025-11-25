# ====== 1. Build stage ======
FROM node:20 AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build Angular for production
COPY . .
RUN npm run build

# NOTE:
# For Angular 17+, the output path is usually "dist/days-alive-ui/browser".
# Check angular.json -> "projects" -> "<projectName>" -> "architect" -> "build" -> "options" -> "outputPath"
# Adjust the path below if needed.

# ====== 2. Run stage (Nginx) ======
FROM nginx:alpine

# Clean default nginx html
RUN rm -rf /usr/share/nginx/html/*

# Copy built app from previous stage
COPY --from=build /app/dist/days-alive-ui/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]