echo $(hostname) | grep 1$ > /dev/null
if [ $? -eq 0 ]; then
	#biz-corp-admin
	S3_BUCKET="s3://biz-corp-admin.carplat.co.kr"
	CDN_ID="E139X2VYLOY8A2"
	BUILD_DIR="build"

	# Clear the S3 bucket
	aws s3 rm $S3_BUCKET --recursive
	# Upload the bundle project
	aws s3 cp $BUILD_DIR $S3_BUCKET --recursive --acl public-read
	# Clear the cache
	aws cloudfront create-invalidation --distribution-id $CDN_ID --paths /index.html /favicon.ico

	#corp
	S3_BUCKET="s3://corp.carplat.co.kr"
	CDN_ID="E3DBQJEFVRL7N3"
	BUILD_DIR="build"

	# Clear the S3 bucket
	aws s3 rm $S3_BUCKET --recursive
	# Upload the bundle project
	aws s3 cp $BUILD_DIR $S3_BUCKET --recursive --acl public-read
	# Clear the cache
	aws cloudfront create-invalidation --distribution-id $CDN_ID --paths /index.html /favicon.ico
fi

# workaround to run forever becase docker is restart=always
while true
do
  sleep 1000
done
