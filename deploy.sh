# Pull all data from master
git pull origin master

# Remove /dist from .gitignore
echo "$(tail -n +2 back/.gitignore)" > back/.gitignore

# Build for production
npm run build-prod

# Commit and push changes to heroku-setup
git add .
git commit -m "Build for production"
git push

heroku login
# Push code to heroku
git push -f heroku heroku-setup:master
