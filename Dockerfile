# Use multi-stage builds to keep the final production image clean and minimal
###################
# STAGE 1: BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:20-alpine AS development

# Set the working directory in the container
WORKDIR /usr/src/app

# Install app dependencies by first copying the package.json files
COPY --chown=node:node package*.json ./

# Install all dependencies necessary for development
RUN npm ci

# Globally install the Nest CLI to aid in development
RUN npm install -g @nestjs/cli

# Copy the entire project code into the container
COPY --chown=node:node . .

# Generate Prisma client which is essential for database interactions
RUN npx prisma generate

# Use non-root user for better security practices
USER node

# Expose the port the application runs on
EXPOSE 3000

# Command to run the app in development with hot reloading
CMD ["npm", "run", "start:dev"]

###################
# STAGE 2: BUILD FOR PRODUCTION
###################
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy over only necessary files for building the app
COPY --chown=node:node . .

# Install dependencies, including both production and development
RUN npm ci

# Build the application into JavaScript from TypeScript
RUN npm run build

# Prune development dependencies to minimize image size
RUN npm ci --only=production

# Ensure the environment is set for production
ENV NODE_ENV production

# Use non-root user for added security
USER node

###################
# STAGE 3: PRODUCTION IMAGE SETUP
###################
FROM node:20-alpine AS production

# Set working directory in the final production image
WORKDIR /usr/src/app

# Copy over node modules and build directories from the build stage
COPY --from=build --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=build --chown=node:node /usr/src/app/dist ./dist

# Confirm environment is production to optimize Node.js performance
ENV NODE_ENV production

# Continue to run as non-root user
USER node

# Expose the same port as in development
EXPOSE 3000

# Command to run your app using the prebuilt distribution files
CMD ["node", "dist/main.js"]