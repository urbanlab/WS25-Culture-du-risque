FROM node:20-alpine

WORKDIR /app

COPY ./* .

RUN npm install

EXPOSE 5173

ENTRYPOINT [ "npm", "run", "host"]

# FROM node:20-alpine AS build

# WORKDIR /app

# # copy node modules from dev stage
# COPY --from=dev /app/ /app/

# RUN npm run build

# FROM node:20-alpine AS prod

# WORKDIR /app

# COPY --from=build /app/ /app/

# WORKDIR /app/build

# ENTRYPOINT [ "node", "index.js" ]