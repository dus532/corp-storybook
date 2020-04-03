# Dockerfile for S3

FROM node:12.16.1 as node_image

# Source
WORKDIR /project

COPY . ./
RUN rm -rf .git

RUN yarn install
RUN yarn build:dev

FROM mesosphere/aws-cli:latest
WORKDIR /project
COPY --from=node_image /project/build build
COPY --from=node_image /project/internals/deploy internals/deploy

CMD ["internals/deply/deploy.sh" ]

ENTRYPOINT [""]
