chmod 600 ./ssh_key.pem
ssh -o 'StrictHostKeyChecking no' -i ./ssh_key.pem ubuntu@dev-ci.dev.platdev.net \
    '(cd carplat20/carplat-biz-corp-admin; repo sync .); \
      [ $? -ne 0 ] && exit -1 || true; \
     (chmod 600 carplat20/carplat-biz-corp-admin/script/ssh_key.pem); \
      [ $? -ne 0 ] && exit -1 || true; \
     (cd carplat20/carplat-infra/deploy; repo sync .; make RUN_TARGET_CLUSTER=dev-biz-corp-admin biz-corp-admin-s3); \
      [ $? -ne 0 ] && exit -1 || true;'
