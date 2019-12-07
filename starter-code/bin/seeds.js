const mongoose = require("mongoose");
const Celebrity = require('../models/celebrities.js');
const Movie = require('../models/movies.js')

Celebrity.collection.drop();
Movie.collection.drop();

const dbName = "celebrityDB";
mongoose.connect(`mongodb://localhost/${dbName}`).catch(err => console.error(err));


const data = [
    {
        name: "Alizee",
        occupation: "graphic gourou",
        catchPhrase: "Vous voulez un chewing gum ?"
    },
    {
        name: "Elisa",
        occupation: "data scientist",
        catchPhrase: "Vous avez fini le lab ?"
    },
    {
        name: "Antoine",
        occupation: "dev phrophet",
        catchPhrase: "waawaawaa"
    }
];

const dataMovies = [
    {
        title: "Gladiator",
        genre: "epique",
        plot: "Une histoire d'hommes et d'honneur",
        cast:[]
    }
];

Celebrity.create(data).then(function(celebrities){
    console.log(`Created ${celebrities.length} new celebs`);
}).catch(err => console.error(err));

Movie.create(dataMovies).then(function(movies){
    console.log(`Created ${movies.length} new films`);
}).catch(err => console.error(err));

