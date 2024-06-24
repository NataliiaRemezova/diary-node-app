# Use the official Node.js 21 slim image as the base image
FROM node:21-slim

# Set the working directory
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev"]
