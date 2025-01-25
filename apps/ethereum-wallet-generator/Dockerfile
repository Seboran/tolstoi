# build stage
FROM node:lts-alpine@sha256:e2b39f7b64281324929257d0f8004fb6cb4bf0fdfb9aa8cedb235a766aec31da as build-stage
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod
COPY . .
RUN yarn run build

# production stage
FROM nginx:stable-alpine@sha256:b9e1705b69f778dca93cbbbe97d2c2562fb26cac1079cdea4e40d1dad98f14fe as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]