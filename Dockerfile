# build stage
FROM node:lts-alpine@sha256:09dbe0a53523c2482d85a037efc6b0e8e8bb16c6f1acf431fe36aa0ebc871c06 as build-stage
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod
COPY . .
RUN yarn run build

# production stage
FROM nginx:stable-alpine@sha256:c4d0f9ee8b59739ada4a537a725cb61d7dca98e9c7b522d635a5e7b6ff94f9cd as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]