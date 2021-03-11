/* global __dirname */
const express = require( 'express' ),
    morgan = require( 'morgan' ),
    bodyParser = require( 'body-parser' ),
    uuid = require( 'uuid' ),
    mongoose = require( 'mongoose' ),
    passport = require( 'passport' ),
    cors = require( 'cors' ),
    { check, validationResult } = require( 'express-validator' ),
    Models = require( './models.js' );

const app = express();
//import Models
const Movies = Models.Movie;
const Users = Models.User;

//connect to local mongoDB
//mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true});
//connect to MongoDB Atlas
mongoose.connect( process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true } );
//use terminal logger
app.use( morgan( 'common' ) );
//serve static files from within 'public' folder
app.use( express.static( 'public' ) );
//use json format for body parsing operations by default
app.use( bodyParser.json() );

//implement authentication strategies
const auth = require( './auth.js' )( app );
require( './passport.js' );

//set cors policy for this app
let allowedOrigins = ['*', 'http://localhost:1234'];

app.use( cors(
    //     {
    //     origin: (origin, callback) => {
    //         if(!origin) return callback(null, true);
    //         if(allowedOrigins.indexOf(origin) === -1) {
    //             let message = 'The CORS policy for this application does not allow access from origin ' + origin;
    //             return callback(new Error(message), false);
    //             }
    //             return callback(null, true);
    //     }
    // }
) )

//error handler
app.use( ( err, req, res, next ) => {
    console.error( err.stack );
    res.status( 500 ).send( 'Something broke!' );
    next();
} )
//define API endpoints
app.get( '/', ( req, res ) => {
    console.log( 'Hi there!' );
    res.status( 200 ).send( 'Welcome to myFlix!' );
} );
//GET a List of all Movies
app.get( '/movies', ( req, res ) => {
    Movies.find()
        .then( ( movies ) => {
            res.status( 201 ).json( movies );
        } )
        .catch( ( err ) => {
            console.error( err );
            res.status( 500 ).send( 'Error: ' + err );
        } );
} );
//GET data about a single movie by title
app.get( '/movies/:Title', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    Movies.findOne( { Title: req.params.Title } )
        .then( ( movie ) => {
            res.status( 200 ).json( movie );
        } )
        .catch( ( err ) => {
            console.error( err );
            res.status( 500 ).send( 'Error: ' + err );
        } );
} );
//GET data about a genre by title
app.get( '/movies/genres/:Title', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    Movies.findOne( { 'Genre.Title': req.params.Title }, 'Genre' )
        .then( ( genre ) => {
            res.status( 200 ).json( genre );
        } )
        .catch( ( err ) => {
            console.error( err );
            res.status( 500 ).send( 'Error: ' + err );
        } );
} );
//GET data about a director by name
app.get( '/movies/directors/:Name', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    Movies.findOne( { 'Director.Name': req.params.Name }, 'Director' )
        .then( ( director ) => {
            res.status( 200 ).json( director );
        } )
        .catch( ( err ) => {
            console.error( err );
            res.status( 500 ).send( 'Error: ' + err );
        } );
} );

//POST a new user (registration)
//make sure unauthenticated users can register initially!
app.post( '/users',
    [
        check( 'Username', 'Username is required and must at least contain 5 characters.' ).isLength( { min: 5 } ),
        check( 'Username', 'Username contains non-alphanumeric characters - not allowed' ).isAlphanumeric(),
        check( 'Password', 'Password is required' ).not().isEmpty(),
        check( 'Email', 'Email does not appear to be valid.' ).isEmail()
    ], ( req, res ) => {
        //check validation object for errors
        let errors = validationResult( req );

        if ( !errors.isEmpty() ) {
            res.status( 422 ).json( { errors: errors.array() } );
        } else {

            let hashedPassword = Users.hashPassword( req.body.Password );
            Users.findOne( { Username: req.body.Username } )
                .then( ( user ) => {
                    if ( user ) { //if user is found, send response that it already exists
                        return res.status( 400 ).send( req.body.Username + ' already exists.' );
                    } else {
                        Users
                            .create( {
                                Username: req.body.Username,
                                Password: hashedPassword,
                                Email: req.body.Email,
                                Birthday: req.body.Birthday
                            } )
                            .then( ( user ) => { res.status( 201 ).json( user ) } )
                            .catch( ( error ) => {
                                console.error( error );
                                res.status( 500 ).send( 'Error: ' + error );
                            } )
                    }
                } )
                .catch( ( error ) => {
                    console.error( error );
                    res.status( 500 ).send( 'Error: ' + error );
                } );
        }
    } );

// Get all users
app.get( '/users', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    Users.find()
        .then( ( users ) => {
            res.status( 200 ).json( users );
        } )
        .catch( ( err ) => {
            console.error( err );
            res.status( 500 ).send( 'Error: ' + err );
        } );
} );

//Get a user by username
app.get( '/users/:Username', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    Users.findOne( { Username: req.params.Username } )
        .then( ( user ) => {
            res.status( 200 ).json( user );
        } )
        .catch( ( err ) => {
            console.error( err );
            res.status( 500 ).send( 'Error: ' + err );
        } );
} );

//Update users credentials
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put( '/users/:Username',
    [
        check( 'Username', 'Username must contain at least 5 characters.' ).isLength( { min: 5 } ),
        check( 'Username', 'Username contains non-alphanumeric characters - not allowed.' ).isAlphanumeric(),
        check( 'Password', 'Password is required.' ).not().isEmpty(),
        check( 'Email', 'Email appears not to be valid.' ).isEmail()
    ], passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
        let errors = validationResult( req );

        if ( !errors.isEmpty() ) {
            res.status( 422 ).json( { errors: errors.array() } );
        } else {

            let hashedPassword = Users.hashPassword( req.body.Password );

            Users.findOneAndUpdate( { Username: req.params.Username },
                {
                    $set:
                    {
                        Username: req.body.Username,
                        Password: hashedPassword,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    }
                },
                { new: true, runValidators: true } ) //This returns the updated document to the following callback function and checks whether the required keys according to the Model are given
                .then( ( updatedUser ) => {
                    res.status( 201 ).json( updatedUser );
                } )
                .catch( ( err ) => {
                    console.error( err );
                    res.status( 500 ).send( 'Error: ' + err );
                } );
        }
    } );

//Adds a movie to a users list of favorites
app.post( '/users/:Username/movies/:MovieID', passport.authenticate( 'jwt', { session: false } ), async ( req, res ) => {
    const movieTitle = await Movies.findById( req.params.MovieID );
    Users.findOneAndUpdate( { Username: req.params.Username },
        {
            $addToSet: { FavoriteMovies: req.params.MovieID }
        } )
        .then( () => {
            res.status( 201 ).send( movieTitle.Title + ' was successfully added to ' + req.params.Username + '\'s list of favorites.' );
        } )
        .catch( ( err ) => {
            console.error( err );
            res.status( 500 ).send( 'Error: ' + err );
        } );
} );
//Deletes a movie from a users list of favorites
app.delete( '/users/:Username/movies/:MovieID', passport.authenticate( 'jwt', { session: false } ), async ( req, res ) => {
    let movie = await Movies.findById( req.params.MovieID );
    Users.findOneAndUpdate( { Username: req.params.Username },
        {
            $pull: { FavoriteMovies: req.params.MovieID }
        } )
        .then( () => {
            res.status( 200 ).send( movie.Title + ' was successfully removed from ' + req.params.Username + '\'s list of favorites.' );
        } )
        .catch( ( err ) => {
            console.error( err );
            res.status( 500 ).send( 'Error: ' + err );
        } );
} );
//Deletes a user by username
app.delete( '/users/:Username', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    Users.findOneAndRemove( { Username: req.params.Username } )
        .then( ( user ) => {
            if ( !user ) {
                res.status( 400 ).send( req.params.Username + ' was not found.' );
            } else {
                res.status( 200 ).send( req.params.Username + ' was deleted.' );
            }
        } )
        .catch( ( err ) => {
            console.error( err );
            res.status( 500 ).send( 'Error: ' + err );
        } );
} );

//queries a movies Title by Id (for test purposes only)
app.get( '/movies/test/:MovieID', ( req, res ) => {
    Movies.findById( req.params.MovieID, 'Title' )
        .then( ( movie ) => {
            res.status( 200 ).send( 'The title of the movie with ObjectId ' + req.params.MovieID + ' is ' + movie.Title + '.' );
        } )
        .catch( ( err ) => {
            console.error( err );
            res.status( 500 ).send( 'Error: ' + err );
        } );
} );
//listen for requests
const port = process.env.PORT || 8080;
app.listen( port, '0.0.0.0', () => {
    console.log( 'Listening on port ' + port );
} );
