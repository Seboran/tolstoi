# build stage
FROM node:lts-alpine@sha256:eb8101caae9ac02229bd64c024919fe3d4504ff7f329da79ca60a04db08cef52 as build-stage
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod
COPY . .
RUN yarn run build

# production stage
FROM nginx:stable-alpine@sha256:d4d72ee8e6d028c5ad939454164d3645be2d38afb5c352277926a48e24abf4fa as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]