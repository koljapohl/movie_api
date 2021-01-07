/* global __dirname */
const express = require('express'),
morgan = require('morgan');

const app = express();

let topMovies = [
    {
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
        genre: 'Science Fiction',
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
        genre: 'Science Fiction',
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
        genre: 'Superhero',
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
        genre: 'Science Fiction',
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

app.use(morgan('common'));
app.use(express.static('public'));
//error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})
//GET requests
app.get('/movies', (req, res) => {
    res.json(topMovies);
});
app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

//listen for requests
app.listen(8080, () => {
    console.log('The app is listening on port 8080.');
});
