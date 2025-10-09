# build stage
FROM node:lts-alpine@sha256:cb3143549582cc5f74f26f0992cdef4a422b22128cb517f94173a5f910fa4ee7 as build-stage
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod
COPY . .
RUN yarn run build

# production stage
FROM nginx:stable-alpine@sha256:c2ef451a56f29f2a541f043a0eb74e92bb38cfe90051d322dbb898389a8a2c1d as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]