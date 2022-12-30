git checkout main
git pull
MSG="$(git log -1 --pretty=%B)"
yarn build
git checkout deploy
git pull
rm -rf assets
mv dist/* .
git add .
git commit -m "$MSG"
git push
git checkout main