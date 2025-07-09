FROM node:18

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the project
COPY . .

# Build the app
RUN npm run build

# Expose Cloud Run port
EXPOSE 8080

# Serve the built app
CMD ["npm", "start"]
