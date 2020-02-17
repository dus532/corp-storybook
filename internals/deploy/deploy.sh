#! /usr/bin/env bash

RUN_TIME_ENV=$1
BUILD_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../" && pwd)/build"

# TODO
#  v CDN 주소 바꿔야됨.
#  v create invalidation에서 index.html, favicon.ico만 포함
#  v CLI 에서 테스트로 돌린 후 확인.
#  v ServiceWorker에 index.html, favicon.ico cache에서 제외됐는지 확인
#  - S3 BUCKET 이름 변경 -> admin.carplat.co.kr | dev-admin.carplat.co.kr 사용중
#  - CDN_ID 숨길지 말지 결정

# Set AWS S3 bucket URL and API server environment
if [ $RUN_TIME_ENV = "development" ]
then
  S3_BUCKET="s3://dev-admin.carplat.co.kr"
  CDN_ID="E1DGANF6KU25Q1"
elif [ $RUN_TIME_ENV = "staging" ]
then
  S3_BUCKET="s3://staging-admin.carplat.co.kr"
  CDN_ID="E2FTNNK8X30JJ1"
  touch $SERVER_ENV_FILE
elif [ $RUN_TIME_ENV = "production" ]
then
  S3_BUCKET="s3://admin.carplat.co.kr"
  CDN_ID="ECM8M116GKOBP"
  touch $SERVER_ENV_FILE
else
  echo "서버 환경 설정이 잘못됐습니다."
  exit
fi

# Build the project
yarn build

# Clear Bucket
aws s3 rm $S3_BUCKET --recursive
# Upload the static page
aws s3 cp $BUILD_DIR $S3_BUCKET --recursive --acl public-read
# Clear cache
aws cloudfront create-invalidation --distribution-id $CDN_ID --paths /index.html /favicon.ico
