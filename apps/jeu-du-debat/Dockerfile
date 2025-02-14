# build stage
FROM node:lts-alpine@sha256:f93d93d31e202006196d5d22babb9bec7615b9a101744717df815d3d87e275f8 as build-stage
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod
COPY . .
RUN yarn run build

# production stage
FROM nginx:stable-alpine@sha256:d05f6fee67a3521d2fe000d471ac9b5af1900847f25b837e167f2213e95ddf0f as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]