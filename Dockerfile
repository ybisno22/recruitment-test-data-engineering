# Dockerfile for CRUD app
FROM node:18

# Working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy files
COPY src /app/src

# Expose the application port
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "run", "start:prod"]