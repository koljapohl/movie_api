/* global __dirname */
const express = require('express'),
morgan = require('morgan'),
bodyParser = require('body-parser'),
uuid = require('uuid');

const app = express();

let movies = [
    {
        id: '1',
        title: 'The Green Mile',
        description: `The Green Mile is a 1999 American fantasy drama film written and directed by Frank Darabont and based on Stephen King's 1996 novel of the same name.
                            It stars Tom Hanks as a death row corrections officer during the Great Depression who witnesses supernatural events that occur after an enigmatic inmate is brought to his facility.`,
        director: 'Frank Darabont',
        genre: 'Drama',
        imgUrl: 'https://static.wikia.nocookie.net/stephenking/images/9/97/301px-TheGreenMileCover.jpg/revision/latest?cb=20170504035640'
    },
    {
        title: 'Rain Man',
        description: `Rain Man is a 1988 American road comedy-drama film directed by Barry Levinson and written by Barry Morrow and Ronald Bass.
                            It tells the story of abrasive, selfish young wheeler-dealer Charlie Babbitt (Tom Cruise), who discovers that his estranged father has died and bequeathed virtually all of his
                            multi-million dollar estate to his other son, Raymond (Dustin Hoffman), an autistic savant, of whose existence Charlie was unaware.
                            Charlie is left with only his father's beloved vintage car and rosebushes. Valeria Golino also stars as Charlie's girlfriend Susanna. `,
        director: 'Barry Levinson',
        genre: 'Drama',
        imgUrl: 'https://www.kulturverein-schneverdingen.de/kv/wp-content/uploads/2019/02/Rain_man-661x1024.jpg'
    },
    {
        title: 'Bad Boys',
        description: `Bad Boys is a 1995 American action comedy film directed by Michael Bay, in his feature directorial debut,
                            produced by Don Simpson and Jerry Bruckheimer and starring Martin Lawrence and Will Smith as two Miami narcotics detectives, Marcus Burnett and Mike Lowrey.
                            Despite mixed reviews, Bad Boys was commercially successful and gained a cult following.`,
        director: 'Michael Bay',
        genre: 'Action',
        imgUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a8/Bad_Boys.jpg'
    },
    {
        title: 'Inception',
        description: `Inception is a 2010 science fiction action film written and directed by Christopher Nolan, who also produced the film with his wife, Emma Thomas.
                            The film stars Leonardo DiCaprio as a professional thief who steals information by infiltrating the subconscious of his targets.
                            He is offered a chance to have his criminal history erased as payment for the implantation of another person's idea into a target's subconscious.`,
        director: 'Christopher Nolan',
        genre: 'Science fiction',
        imgUrl: 'https://pics.filmaffinity.com/inception-652954101-large.jpg'
    },
    {
        title: 'Forrest Gump',
        description: `Forrest Gump is a 1994 American romantic comedy-drama film directed by Robert Zemeckis and written by Eric Roth.
                            It is based on the 1986 novel of the same name by Winston Groom and stars Tom Hanks, Robin Wright, Gary Sinise, Mykelti Williamson and Sally Field.
                            The story depicts several decades in the life of Forrest Gump (Hanks), a slow-witted but kind-hearted
                            man from Alabama who witnesses and unwittingly influences several defining historical events in the 20th century United States.`,
        director: 'Robert Zemeckis',
        genre: 'Drama',
        imgUrl: 'https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg'
    },
    {
        title: 'Armageddon',
        description: `Armageddon is a 1998 American science fiction disaster film produced and directed by Michael Bay, produced by Jerry Bruckheimer, and released by Touchstone Pictures.
                            The film follows a group of blue-collar deep-core drillers sent by NASA to stop a gigantic asteroid on a collision course with Earth.`,
        director: 'Michael Bay',
        genre: 'Science fiction',
        imgUrl: 'https://upload.wikimedia.org/wikipedia/en/f/fc/Armageddon-poster06.jpg'
    },
    {
        title: 'The Dark Knight',
        description: `The Dark Knight is a 2008 superhero film directed, produced, and co-written by Christopher Nolan.
                            Based on the DC Comics character Batman, the film is the second installment of Nolan's The Dark Knight Trilogy and a sequel to 2005's Batman Begins,
                            starring Christian Bale and supported by Michael Caine, Heath Ledger, Gary Oldman, Aaron Eckhart, Maggie Gyllenhaal, and Morgan Freeman.
                            In the film, Bruce Wayne / Batman (Bale), Police Lieutenant James Gordon (Oldman) and District Attorney Harvey Dent (Eckhart)
                            form an alliance to dismantle organized crime in Gotham City, but are menaced by an anarchistic mastermind known as the Joker (Ledger), who seeks to undermine
                            Batman's influence and throw the city into anarchy. `,
        director: 'Christopher Nolan',
        genre: 'Action',
        imgUrl: 'https://cdn.prime1studio.com/media/catalog/product/cache/1/image/1400x1400/17f82f742ffe127f42dca9de82fb58b1/h/d/hdmmdc-02_a19.jpg'
    },
    {
        title: 'The Matrix',
        description: `The Matrix is a 1999 American science fiction action film written and directed by the Wachowskis, and produced by Joel Silver.
                            It stars Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving, and Joe Pantoliano and is the first installment in the Matrix franchise.
                            It depicts a dystopian future in which humanity is unknowingly trapped inside a simulated reality, the Matrix, created by intelligent machines to distract humans while using their bodies as an energy source.
                            When computer programmer Thomas Anderson, under the hacker alias "Neo", uncovers the truth, he "is drawn into a rebellion against the machines"
                            along with other people who have been freed from the Matrix.`,
        director: 'The Wachowskis',
        genre: 'Science fiction',
        imgUrl: 'http://barkerhost.com/wp-content/uploads/sites/4/2019/03/gynBNzwyaHKtXqlEKKLioNkjKgN-1.jpg'
    },
    {
        title: 'American History X',
        description: `American History X is a 1998 American crime drama film directed by Tony Kaye and written by David McKenna.
                            The film stars Edward Norton and Edward Furlong, as two brothers from Los Angeles who are involved in the white supremacist and neo-Nazi movements.
                            The older brother (Norton) serves three years in prison for voluntary manslaughter, and is rehabilitated during this time, and then tries to prevent his brother from further indoctrination.`,
        director: 'Tony Kaye',
        genre: 'Drama',
        imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/914VeNPLGZL._RI_.jpg'
    },
    {
        title: 'The Intouchables',
        description: `The Intouchables is a French buddy comedy-drama film directed by Olivier Nakache. It stars François Cluzet and Omar Sy.
                            Nine weeks after its release in France on 2 November 2011, it became the second biggest box office hit in France, just behind the 2008 film Welcome to the Sticks.`,
        director: 'Olivier Nakache',
        genre: 'Drama',
        imgUrl: 'https://flxt.tmsimg.com/assets/p9096998_p_v13_bh.jpg'
    }
];

let genres = [
    {
        title: 'Drama',
        description: `The drama genre features stories with high stakes and a lot of conflicts.
        They’re plot-driven and demand that every character and scene move the story forward.
        Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters.
        Films that fall into drama sub-genres include historical drama, romantic drama, teen drama, medical drama, docudrama, and film noir.`
    },
    {
        title: 'Action',
        description: `Movies in the action genre are fast-paced and include a lot of action like fight scenes, chase scenes, and slow-motion shots.
        They can feature superheroes, martial arts, or exciting stunts.
        These high-octane films are more about the execution of the plot rather than the plot itself.
        Action movies are meant to be thrilling to watch and leave audience members on the edge of their seats.
        Cop movies, disaster films, and some spy films all fall under the action category.`
    },
    {
        title: 'Science fiction',
        description: `The sci-fi genre builds worlds and alternate realities filled with imagined elements that don’t exist in the real world.
        Science fiction spans a wide range of themes that often explore time travel, space travel, are set in the future, and deal with the consequences of technological and scientific advances.
        Sci-fi movies typically involve meticulous world-building with a strong attention to detail in order for the audience to believe the story and universe.`
    },
];

let directors = [
    {
        name: 'Frank Darabont',
        bio: `Frank Árpád Darabont is a Hungarian-American film director, screenwriter and producer
         who has been nominated for three Academy Awards and a Golden Globe Award.
         In his early career, he was primarily a screenwriter for horror films such as A Nightmare on Elm Street 3: Dream Warriors (1987),
         The Blob (1988) and The Fly II (1989). As a director, he is known for his film adaptations of Stephen King novellas and novels
         such as The Shawshank Redemption (1994), The Green Mile (1999) and The Mist (2007).`,
         birthYear: '1959',
         deathYear: '-'
    },
    {
        name: 'Barry Levinson',
        bio: `Barry Levinson is an American filmmaker, screenwriter, and actor.
        Levinson's best-known works are mid-budget comedy-drama and drama films such as Diner (1982),
        The Natural (1984), Good Morning, Vietnam (1987), Bugsy (1991), and Wag the Dog (1997).
        He won the Academy Award for Best Director for Rain Man (1988).`,
        birthYear: '1942',
        deathYear: '-'
    },
    {
        name: 'Michael Bay',
        bio: `Michael Benjamin Bay is an American film director and producer.
        He is best known for making big-budget, high-concept action films characterized by fast cutting,
        stylistic cinematography and visuals, and extensive use of special effects, including frequent depictions of explosions.
        The films he has produced and directed, which include Armageddon (1998), Pearl Harbor (2001)
        and the Transformers film series (2007–present), have grossed over US$7.8 billion worldwide,
        making him one of the most commercially successful directors in history.`,
        birthYear: '1965',
        deathYear: '-'
    },
    {
        name: 'Christopher Nolan',
        bio: 'Christopher Edward Nolan CBE is a British-American film director, producer, and screenwriter. '+
        'His directorial efforts have grossed more than US$5.1 billion worldwide, garnered 34 Oscar nominations and ten wins. '+
        'Born and raised in London, Nolan developed an interest in filmmaking from a young age. '+
        'After studying English literature at University College London, he made his feature debut with Following (1998). '+
        'Nolan gained international recognition with his second film, Memento (2000), for which he was nominated for the Academy Award for Best Original Screenplay. '+
        'He transitioned from independent to studio filmmaking with Insomnia (2002), and found further critical and '+
        'commercial success with The Dark Knight Trilogy (2005–2012), The Prestige (2006), and Inception (2010), '+
        'which received eight Oscar nominations, including for Best Picture and Best Original Screenplay. '+
        'This was followed by Interstellar (2014), Dunkirk (2017), and Tenet (2020). '+
        'He earned Academy Award nominations for Best Picture and Best Director for his work on Dunkirk.',
        birthYear: '1970',
        deathYear: '-'
    }
];
let users = [];
app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());
//error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

app.get('/', (req, res) => {
    console.log('Hi there!');
    res.send('Welcome to myFlix!');
});
//GET a List of all Movies
app.get('/movies', (req, res) => {
    res.status(201).json(movies);
});
//GET data about a single movie by title
app.get('/movies/:title', (req, res) => {
    let movie = movies.find((movie) => {return movie.title === req.params.title});
    if (movie) {
        res.status(201).json(movie);
    } else {
        res.status(404).send('Movie ' + req.params.title + ' was not found.');
    }
});
//GET data about a genre by title
app.get('/movies/genres/:title', (req, res) => {
    let genre = genres.find((genre) => {return genre.title === req.params.title});
    if (genre) {
        res.status(201).json(genre);
    } else {
        res.status(404).send('Genre ' + req.params.title + ' was not found.');
    }
});
//GET data about a director by name
app.get('/movies/directors/:name', (req, res) => {
    let director = directors.find((director) => {return director.name === req.params.name});
    if (director) {
        res.status(201).json(director);
    } else {
        res.status(404).send('Director ' + req.params.name + ' was not found.');
    }
});
//POST a new user (registration)
app.post('/users', (req, res) => {
    let newUser = req.body;
    let user = users.find((user) => {return user.username === newUser.username});
    if(!user) {
        newUser.id = uuid.v4();
        newUser.favoriteMovies = [];
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('This user already exists.');
    }
});
//Update users credentials
app.put('/users/:username', (req, res) => {
    let newCreds = req.body;
    let user = users.find((user) => {return user.username === req.params.username});
    if (!user) {
        res.status(404).send('User ' + newCreds.username + ' is not registered.');
    } else {
        user.username = newCreds.username;
        user.password = newCreds.password;
        user.email = newCreds.email;
        user.doB = newCreds.doB;
        res.status(201).json(user);
    }
});
//Adds a movie to a users list of favorites
app.post('/users/:username/movies/:mId', (req, res) => {
    let user = users.find((user) => {return user.username === req.params.username});
    let movie = movies.find((movie) => {return movie.id === req.params.mId});

    if (!user) {
        res.status(404).send('This user does not exist.');
    } else if (!movie) {
        res.status(404).send('This movie could not be found within database.');
    } else {
        user.favoriteMovies.push(movie);
        res.status(201).send('This movie was successfully added to ' + user.username + 's list of favorites.');
    }
});
//Deletes a movie from a users list of favorites
app.delete('/users/:username/movies/:mId', (req, res) => {
    let user = users.find((user) => {return user.username === req.params.username});

    if (!user) {
        res.status(404).send('This user does not exist.');
    } else {
        let movie = user.favoriteMovies.find((movie) => {return movie.id === req.params.mId});
        if (!movie) {
            res.status(404).send('This movie could not be found within ' + user.username +'s list of favorites.');
        } else {
        user.favoriteMovies = user.favoriteMovies.filter((obj) => {return obj.id !== req.params.mId});
        res.status(201).send('This movie was successfully deleted from ' + user.username + 's list of favorites.');
        }
    }
});
//Deletes a user
app.delete('/users/:username', (req, res) => {
    let user = users.find((user) => {return user.username === req.params.username});

    if (!user) {
        res.status(404).send(req.params.username + ' was not found.');
    } else {
        users.filter((obj) => {return obj.username !== req.params.username});
        res.status(201).send(req.params.username + ' was successfully deregistered.');
    }
});

//listen for requests
app.listen(8080, () => {
    console.log('The app is listening on port 8080.');
});
