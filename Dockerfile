ARG BASE_IMAGE=node:12-alpine

FROM $BASE_IMAGE AS deps

# Download the repo
git clone https://github.com/plat-dev/carplat-admin
# Enter the repo
cd carplat-admin
# Install the dependencies
yarn
# Start local development
yarn start

#CMD [ "yarn", "start" ]
EXPOSE 3000
