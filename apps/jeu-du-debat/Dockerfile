# build stage
FROM node:lts-alpine@sha256:b64ced2e7cd0a4816699fe308ce6e8a08ccba463c757c00c14cd372e3d2c763e as build-stage
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod
COPY . .
RUN yarn run build

# production stage
FROM nginx:stable-alpine@sha256:35e3238f2f0925a505d5d697df9a9148db9a0c78e89fd2e253919047b3cec824 as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]