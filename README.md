# Express Boilerplate!

This is a boilerplate project used for starting new projects!

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.

//Current version notes//
The flow of control will go as follows:

    1-We start the server with npm start aka
    node ./src/server.js

    2-The server.js file requires the app instance from the app.js file

    3-The app.js file creates the express instance, app and exports it

    4-The server.js file creates the Knex instance
    
    5-The server.js file attaches the Knex instance to the app as a property called 'db'
    
    6-The server.js tells the app to start listening on a port number
    
    7-Any request handling middleware can now read the 'db' property on the app to get the Knex instance