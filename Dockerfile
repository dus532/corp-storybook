#
# CARPLAT ADMIN (https://admin.carplat.co.kr)
#
# build (at the repo root):
#   docker build --no-cache -t platdev/carplat-admin -f Dockerfile .
# run:
#   docker run --env-file=path/to/.env --name admin-server -d -p 80:80 -it platdev/carplat-admin
#

FROM node:lts as builder

# Create app directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH 
#ENV NODE_ENV=production 

# Install
COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
RUN yarn install --ignore-scripts

# Build
COPY . /usr/src/app
RUN yarn build

FROM nginx:1.13.9-alpine

# set nginx conf
RUN rm -rf /etc/nginx/conf.d
COPY server/conf /etc/nginx

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
