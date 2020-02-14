chmod 600 ./ssh_key.pem
ssh -i ./ssh_key.pem ubuntu@cisds.platdev.net \
    '(cd carplat20/carplat-admin; repo sync .); \
     (chmod 600 carplat20/carplat-admin/script/ssh_key.pem); \
     (cd carplat20/carplat-infra/deploy; repo sync .; make RUN_TARGET_CLUSTER=srvsds webapp)'
