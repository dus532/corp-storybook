#ENV aws-access-key-id DEV_AWS_ACCESS_KEY_ID
export AWS_ACCESS_KEY_ID=AKIAR2CPO2722REHACGK
#ENV aws-secret-access-key DEV_AWS_SECRET_ACCESS_KEY
export AWS_SECRET_ACCESS_KEY=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
#ENV aws-region DEV_AWS_DEFAULT_REGION
export AWS_DEFAULT_REGION=ap-northeast-2

S3_BUCKET="s3://biz-corp-admin.dev.platdev.net"
CDN_ID="E1SAL9QNUQW32T"
BUILD_DIR="build"

# Clear the S3 bucket
aws s3 rm $S3_BUCKET --recursive
# Upload the bundle project
aws s3 cp $BUILD_DIR $S3_BUCKET --recursive --acl public-read
# Clear the cache
aws cloudfront create-invalidation --distribution-id $CDN_ID --paths /index.html /favicon.ico

# workaround to run forever becase docker is restart=always
while true
do
  sleep 1000
done
