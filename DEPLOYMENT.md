# Silma
This guide includes the detail to perform a productive deployment of project Silma.

### Production for Heroku

1. Make sure to be in `production` branch:
```sh
git checkout production
```

2. <b>If needed</b> add a remote to the local repository.
```sh
heroku git:remote -a silma
```

3. To easily deploy all changes made in master, run a shell script that automatically builds the project and deploys to heroku:
```sh
bash deploy.sh
# or
sudo sh deploy.sh
```
<em>Note: make sure to be at the top of the project</em>

##### Alternative
If for some reason you need to do this manually, do the following

3. Make sure you pull all changes made in master:

```sh
git pull origin master
```
4. Go to the file `back/.gitignore` and remove the `dist` line.

5. Build the project for production:

<em>Note: make sure to be at the top of the project</em>

```sh
npm run build-prod
```

<em>This will create files inside `back/dist`</em>

6. Push your changes to this branch:

```sh
git add .
git commit -m "Build for production"
git push
```

7. Push your production code to Heroku:
```sh
heroku login
git push heroku production:master
```

##### Visualize your changes
Open app in browser: https://silma.herokuapp.com

Also you can check logs from heroku:
```sh
heroku logs --tail
```