# Dockerfile for Data Ingestion
FROM node:18

# Working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy files 
COPY src /app/src
COPY data /app/data

# Run the ingestion script
CMD ["node", "src/ingest/ingestData.js"]