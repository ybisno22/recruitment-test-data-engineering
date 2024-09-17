# Dockerfile for Data Summary
FROM node:18

# Working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the necessary files for the summary generation
COPY src /app/src
COPY data /app/data

# Command to run the generateSummary script
CMD ["node", "src/generateSummary/generateSummary.js"]
