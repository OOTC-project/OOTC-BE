###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20-alpine AS development

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies by copying package.json and package-lock.json
COPY --chown=node:node package*.json ./

# Install all dependencies, including devDependencies
RUN npm ci

# If the Nest CLI is not part of your package.json, install it globally
RUN npm install -g @nestjs/cli

# Copy local code to the container image
COPY --chown=node:node . .

# Switch to user 'node' for security
USER node

# Expose the port the app runs on
EXPOSE 3000

# Run the app using npm run start:dev for hot reloading
CMD ["npm", "run", "start:dev"]

###################
# BUILD FOR PRODUCTION
###################

FROM node:20-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copying necessary files
COPY --chown=node:node . .

# Install dependencies including 'devDependencies'
RUN npm ci

# Build the project
RUN npm run build

# Remove development dependencies
RUN npm ci --only=production

# Set environment to production
ENV NODE_ENV production

# Use 'node' user
USER node

###################
# PRODUCTION
###################

FROM node:20-alpine AS production

# Set working directory
WORKDIR /usr/src/app

# Copying from build stage
COPY --from=build --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=build --chown=node:node /usr/src/app/dist ./dist

# Set environment to production
ENV NODE_ENV production

# Use 'node' user
USER node

# Expose port 3000
EXPOSE 3000

# Command to run the app
CMD ["node", "dist/main.js"]
