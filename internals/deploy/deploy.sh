#! /usr/bin/env bash

RUN_TIME_ENV=$1
BUILD_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../" && pwd)/build"

# Set the S3 bucket URL and the cloudfront ID
if [ $RUN_TIME_ENV = "development" ]
then
  S3_BUCKET="s3://biz-corp-admin.dev.platdev.net"
  CDN_ID="E1SAL9QNUQW32T"

  # Build the project
  yarn build:dev
elif [ $RUN_TIME_ENV = "staging" ]
then
  S3_BUCKET="s3://biz-corp-admin.staging.platdev.net"
  CDN_ID="E3R4V6QQQDQ8UZ"

  # Build the project
  yarn build:stage
elif [ $RUN_TIME_ENV = "production" ]
then
  S3_BUCKET="s3://biz-corp-admin.preprod.platdev.net"
  CDN_ID="EG5EDGEAVU4RV"

  # Build the project
  yarn build:prod
else
  echo "서버 환경 설정이 잘못됐습니다."
  exit
fi

# Clear the S3 bucket
aws s3 rm $S3_BUCKET --recursive
# Upload the bundle project
aws s3 cp $BUILD_DIR $S3_BUCKET --recursive --acl public-read
# Clear the cache
aws cloudfront create-invalidation --distribution-id $CDN_ID --paths /index.html /favicon.ico
