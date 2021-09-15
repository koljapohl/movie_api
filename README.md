# MyFlix REST-API

## Project description

This project's objective is to build the server-side component of a “movies” web application. The web  application will provide users with access to information about different movies, directors, and genres.
Users will be able to sign up, update their personal information, and create a list of their favorite movies.

## User stories

+ as a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.
+ as a user, I want to be able to create a profile so I can save data about my favorite movies.

## Key features

● Return a list of ALL movies to the user
● Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
● Return data about a genre (description) by name/title (e.g., “Thriller”)
● Return data about a director (bio, birth year, death year) by name
● Allow new users to register
● Allow users to update their user info (username, password, email, date of birth)
● Allow users to add a movie to their list of favorites
● Allow users to remove a movie from their list of favorites
● Allow existing users to deregister

## Dependencies

+ morgan
+ mongoose
+ cors
+ bcrypt
+ express-validator

## Tools used

+ Express
+ Postman
+ MongoDBCompass
+ Heroku

## getting started

Requirements:

+ Node.js

## Setup

+ clone repo to your hard drive
+ install dependencies

`npm install`

+ within root folder start of node server by running

`node index.js` OR `npm run start`

## Deploy to Heroku

For uploading the newest *committed* code and deploying it to Heroku, run

`git push heroku main`
