# Build Environment: Node
FROM node:16.19.0

# Env
WORKDIR /app

# Export port 3000 for Next
EXPOSE 3000

COPY package*.json ./

# Install Deps
RUN yarn install

# Copy the rest of the application files to the container
COPY . .

# Build TS into JS to run via Node
RUN yarn build

# Run Node index.js file
CMD [ "yarn", "start" ]