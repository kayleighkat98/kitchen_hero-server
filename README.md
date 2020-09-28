HEROKU URL:
https://fierce-hollows-91839.herokuapp.com/ deployed to Heroku

This is a boilerplate project used for starting new projects!

## Seed the database

psql -U postgres -d kitchen_hero -f ./seeds/seed.ingredients.sql



## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.

