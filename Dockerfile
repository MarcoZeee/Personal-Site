# Base image
FROM node:18

# Working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the code
COPY . .

# Expose port
EXPOSE 3000

RUN yarn build

# Start the application
CMD ["yarn", "start"]