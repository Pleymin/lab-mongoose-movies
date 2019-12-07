const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrities.js');
const Movie = require('../models/movies.js');


/* GET home page */
router.get('/', (req, res, next) => {
    Movie.find().then(function(film){
        console.log(film);
        res.render('movies/index', {
            allMovies: film
        });
    }).catch(err => console.error(err));
});

module.exports = router;


// routes vers page modif

router.get('/new', function(req, res, next){
    Celebrity.find().then(function (allCeleb){
        console.log(allCeleb)
        res.render('movies/new', {
            allCeleb
        });
    })
})

router.post('/new', function(req, res, next){
    const title = req.body.title;
    const genre = req.body.genre;
    const plot = req.body.plot;
    const cast = req.body.cast;

    Movie.create({
        title,
        genre,
        plot,
        cast
    }).then(function(celeb){
        res.redirect("/movies")
        console.log("OK")
    }).catch(function(err){
        console.error(err);
        res.redirect("/movies/new")
    })
})


// delete films

router.post('/:id/delete', function(req, res, next){
    console.log(req.params.id);
    Movie.findByIdAndRemove(req.params.id)
    .then(function(){
        res.redirect("/movies");
    }).catch(err => console.error(err))
})


// route pour modifier des films

router.get('/:id/edit', function(req, res, next){

    Movie.findById(req.params.id).then(function(movies){
        Celebrity.find().then(function (allCeleb){
            res.render("movies/edit", {
            movies,
            allCeleb
        })
    }).catch(err => next(err))
})
})

router.post('/:id/edit', function(req, res, next){
    Movie.update({_id: req.params.id},{$set: {
        title : req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }}).then(function(){
        res.redirect(`/movies`);
    }).catch(err => next(err));
})


// route vers Movie ID

router.get('/:id', function(req, res, next){
    Movie.findById({_id: req.params.id}).then(function(film){
        res.render('movies/show', {
            film:film
        });
    }).catch(err => {console.log(err); next(err)})
})


