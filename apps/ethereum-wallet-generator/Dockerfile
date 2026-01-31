# build stage
FROM node:lts-alpine@sha256:cd6fb7efa6490f039f3471a189214d5f548c11df1ff9e5b181aa49e22c14383e as build-stage
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod
COPY . .
RUN yarn run build

# production stage
FROM nginx:stable-alpine@sha256:52e3ada4d978443601f286cc2f9e7b95c82aa3ad5a78ce9c6b94ce00258e68cc as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]