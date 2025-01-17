# Use the official Node.js image as the base image
FROM node:22.2-alpine3.19

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY . .

# Install the dependencies
RUN npm install

# Install Gulp globally
RUN npm install -g gulp

RUN npm install -g webpack webpack-cli
# Expose the port the app runs on
EXPOSE 8000 3000 3001

# Default command to run when the container starts
CMD ["npm","run", "docker-start"]