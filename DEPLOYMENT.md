# Silma
This guide includes the detail to perform a productive deployment of project Silma.

### Production for Heroku

1. Make sure to be in `production` branch:
```sh
git checkout production
```

2. Pull changes from master:
```sh
git pull origin master
```

3. Build the project for production:

<em>Note: make sure to be at the top of the project</em>

```sh
npm run build-prod
```

<em>This will change/create files inside `back/dist`</em>

4. Push your changes to this branch:

```sh
git add .
git commit -m "Build for production"
git push
```

5. Push your production code to Heroku:
```sh
git push heroku production:master
```

6. Open in browser: https://silma.herokuapp.com
