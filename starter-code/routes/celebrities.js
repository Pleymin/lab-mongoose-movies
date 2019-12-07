const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrities.js');

/* GET home page */
router.get('/', (req, res, next) => {
    Celebrity.find().then(function(celeb){
        console.log(celeb);
        res.render('celebrities/index', {
            allCeleb: celeb
        });
    }).catch(err => console.error(err));
});

module.exports = router;


// routes vers page modif

router.get('/new', function(req, res, next){
    res.render('celebrities/new');
})

router.post('/new', function(req, res, next){
    console.log("YOUHOU")
    const name = req.body.name;
    const occupation = req.body.occupation;
    const catchphrase = req.body.catchphrase;

    Celebrity.create({
        name,
        occupation,
        catchphrase
    }).then(function(celeb){
        res.redirect("/celebrities")
        console.log("OK")
    }).catch(function(err){
        console.error(err);
        res.redirect("/celebrities/new")
    })
})


// delete celebs

router.post('/:id/delete', function(req, res, next){
    console.log(req.params.id);
    Celebrity.findByIdAndRemove(req.params.id)
    .then(function(){
        res.redirect("/celebrities");
    }).catch(err => console.error(err))
})


// route pour modifier des celebs

router.get('/:id/edit', function(req, res, next){
    Celebrity.findById(req.params.id).then(function(celeb){
        res.render("celebrities/edit", {
            celeb
        })
    }).catch(err => next(err))
})

router.post('/:id/edit', function(req, res, next){
    Celebrity.update({_id: req.params.id},{$set: {
        name : req.body.name,
        occupation: req.body.occupation,
        catchphrase: req.body.catchphrase
    }}).then(function(celeb){
        res.redirect(`/celebrities`);
    }).catch(err => next(err));
})


// route vers Celebrity ID

router.get('/:id', function(req, res, next){
    Celebrity.findById({_id: req.params.id}).then(function(celeb){
        res.render('celebrities/show', {
            celeb:celeb
        });
    }).catch(err => {console.log(err); next(err)})
})



