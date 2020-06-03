# biz-corp-admin
S3_BUCKET="s3://biz-corp-admin.dev.platdev.net"
CDN_ID="E1SAL9QNUQW32T"
BUILD_DIR="build"

# Clear the S3 bucket
aws s3 rm $S3_BUCKET --recursive
# Upload the bundle project
aws s3 cp $BUILD_DIR $S3_BUCKET --recursive --acl public-read
# Clear the cache
aws cloudfront create-invalidation --distribution-id $CDN_ID --paths /index.html /favicon.ico

# corp
S3_BUCKET="s3://corp.dev.platdev.net"
CDN_ID="EH4GXQPTR2CTE"
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
