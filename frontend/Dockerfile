FROM node:20.15.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the Angular application
RUN npm run build

# Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:stable-alpine

# Copy the built application from the builder stage to the Nginx web directory
COPY --from=builder /app/dist/angular-stock/browser /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY src/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]