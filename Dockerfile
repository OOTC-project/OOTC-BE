###################
# BASE IMAGE
###################

FROM node:20-alpine AS base

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy local code to the container image
COPY . .

###################
# BUILD FOR DEVELOPMENT
###################

FROM base AS development

# If the Nest CLI is not part of your package.json, install it globally
RUN npm install -g @nestjs/cli

# Generate Prisma client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 7777

# Run the app using npm run start:dev for hot reloading
CMD ["npm", "run", "start:dev"]

###################
# BUILD FOR PRODUCTION
###################

FROM base AS build

# Generate Prisma client
RUN npx prisma generate

# Build the project
RUN NODE_OPTIONS=--max-old-space-size=4096 npm run build

# Remove development dependencies
RUN npm ci --only=production

###################
# PRODUCTION
###################

FROM node:20-alpine AS production

# Set working directory
WORKDIR /usr/src/app

# Copying from build stage
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Set environment to production
ENV NODE_ENV production

# Expose port 7777
EXPOSE 7777

# Add ls command to inspect the files and check for dist directory
RUN ls -l /usr/src/app || { echo '/usr/src/app directory does not exist'; exit 1; }
RUN ls -l /usr/src/app/dist && echo 'dist directory exists' || { echo 'dist directory does not exist'; exit 1; }

# Command to run the app
CMD ["node", "--max-old-space-size=4096", "dist/main.js"]