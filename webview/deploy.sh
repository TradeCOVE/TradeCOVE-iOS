git pull
npm i
npm run build
rsync -avz client/dist/* s3:/projects/www/src/trade2.mgbeta.ru
