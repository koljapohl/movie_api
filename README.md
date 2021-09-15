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

## API Endpoints

<div class="table-responsive">
        <table class="table table-sm table-bordered table-hover table-striped">
            <thead>
                <tr>
                    <th scope="col">Endpoint</th>
                    <th scope="col">Business Logic</th>
                    <th scope="col">HTTP Method</th>
                    <th scope="col">Request body data format</th>
                    <th scope="col">Response body data format</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">/</th>
                    <td>Welcoming the client to the API</td>
                    <td>GET</td>
                    <td>None</td>
                    <td>A text message welcoming the client to the API</td>
                </tr>
                <tr>
                    <th scope="row">/movies</th>
                    <td>Returns a list of all movies to the user</td>
                    <td>GET</td>
                    <td>None</td>
                    <td>A JSON object holding data about all movies</td>
                </tr>
                <tr>
                    <th scope="row">/movies/[Title]</th>
                    <td>Returns data about a single movie by title to the user</td>
                    <td>GET</td>
                    <td>None</td>
                    <td>A JSON object holding data about a single movie, containing the title,
                        description, director, genre and image URL. Example:
<pre><code>{
    "Title": "The Green Mile",
    "Description": "The Green Mile is a 1999 American fantasy drama film [...]",
    "Director": {
        "Name": "Frank Darabont",
        "Bio": "Frank Darabont is a Hungarian-American film director [...]",
        "BirthYear": "1959-01-01"
    },
    "Genre": {
        "Title": "Drama",
        "Description": "The drama genre features stories with high [...]"
    },
    "ImagePath": "https://static.wikia.nocookie.net/stephenking/images
    /9/97/301px-TheGreenMileCover.jpg/revision/latest?cb=20170504035640",
    "Featured": true
}</code></pre>
                    </td>
                </tr>
                <tr>
                    <th scope="row">movies/genres/[Title]</th>
                    <td>Returns data about a genre by title</td>
                    <td>GET</td>
                    <td>None</td>
                    <td>A JSON object holding data about a genre,
                        containing the title and description. Example:
<pre><code>{
    "Title": "Drama",
    "Description": "The drama genre features stories [...]"
}</code></pre>
                    </td>
                </tr>
                <tr>
                    <th scope="row">movies/directors/[Name]</th>
                    <td>Returns data about a director by name</td>
                    <td>GET</td>
                    <td>None</td>
                    <td>A JSON object holding data about a director, containing
                        the name, bio, birth year, death year. Example:
<pre><code>{
    "Name": "Christopher Nolan",
    "Bio": "Christopher Edward Nolan CBE is a British-American [...]",
    "BirthYear": "1970"
}</code></pre>
                    </td>
                </tr>
                <tr>
                    <th scope="row">/users</th>
                    <td>Allows a new user to register</td>
                    <td>POST</td>
                    <td>A JSON object holding data about the user to add, containing
                        the username, password, email and date of birth. Example:
<pre><code>{
    "Username": "Ryan Twinsley",
    "Password": "morethansafe",
    "Email": "ryan.twinsley@somehost.com",
    "Birthday": "1998-03-15"
}</code></pre>
                    </td>
                    <td>A JSON object holding data about the user added, including an ID:
<pre><code>{
    "_id": "1",
    "FavoriteMovies": [],
    "Username": "Ryan Twinsley",
    "Password": "morethansafe",
    "Email": "ryan.twinsley@somehost.com",
    "Birthday": "1998-03-15"
}</code></pre>
                    </td>
                </tr>
                <tr>
                    <th scope="row">/users/[Username]</th>
                    <td>Allows a user to update its user informations</td>
                    <td>PUT</td>
                    <td>A JSON object holding all data that is intended to be updated about that user (Username, Password and Email are always required!):
<pre><code>{
    "Username": "Ryan Twinsley",
    "Password": "evenmorethansafe",
    "Email": "ryan.twinsley@somehost.com",
    "Birthday": "1998-03-15"
}</code></pre>
                    </td>
                    <td>A JSON object holding all (updated and not updated) data about that user:
<pre><code>{
    "_id": "1",
    "FavoriteMovies": [
        "6009641fd0dd125620f809d3",
        "60097045d0dd125620f809d9",
        "6009709ad0dd125620f809da"
    ],
    "Username": "Ryan Twinsley",
    "Password": "evenmorethansafe",
    "Email": "ryan.twinsley@somehost.com",
    "Birthday": "1998-03-15"
}</code></pre>
                    </td>
                </tr>
                <tr>
                    <th scope="row">/users/[Username]/movies/[MovieID]</th>
                    <td>Allows a user to add a movie to its list of favorites</td>
                    <td>POST</td>
                    <td>None</td>
                    <td>A text message indicating whether the given movie was successfully added
                        to the users list of favorites
                    </td>
                </tr>
                <tr>
                    <th scope="row">/users/[Username]/movies/[MovieID]</th>
                    <td>Allows a user to remove a movie from its list of favorites</td>
                    <td>DELETE</td>
                    <td>None</td>
                    <td>A text message indicating whether the given movie was successfully deleted
                        from the users list of favorites
                    </td>
                </tr>
                <tr>
                    <th scope="row">/users/[Username]</th>
                    <td>Allows an existing user to deregister</td>
                    <td>DELETE</td>
                    <td>None</td>
                    <td>A text message indicating whether the user was deregistered successfully</td>
                </tr>
            </tbody>
        </table>
        <p>"/users/<strong>[Username]</strong>/movies/<strong>[MovieID]</strong>"<br>
            Please note that within the given URL-endpoints, every fraction encountered by brackets are <strong><u>query parameters.</u></strong><br>
            When setting a request to this endpoint, you need to adapt <strong>[Username]</strong> and  <strong>[MovieID]</strong>
            to the corresponding <strong><em>:Username</em></strong> and <strong><em>:MovieID</em></strong>.</p>
    </div>

for further endpoint documentation please see: [https://myflix-kp.herokuapp.com/documentation.html]
