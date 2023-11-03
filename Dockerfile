FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# # Initialize database and start server
CMD ["node", "index.js"]

# # Expose port
EXPOSE 3001