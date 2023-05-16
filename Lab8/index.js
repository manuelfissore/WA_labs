'use strict' ;

const express = require('express') ;
const morgan = require('morgan') ;
const dao = require('./film-dao') ;
const {Film} = require('./film') ;

const app = express() ;
app.use(morgan());
app.use(express.json());

//ok
app.post('/api/films', (req,res)=>{
    const film = new Film(null, req.body.Title, req.body.isFavorite, req.body.Date, req.body.Rating) ;
    console.log(film)
    dao.createFilm(film).then((result)=>{
        res.status(200).send("correcty insered") ;
    }).catch((error)=>{
        res.status(500).send(error) ;
    })

})

//ok
app.get('/api/films', (req, res)=>{
    dao.listFilms().then((result)=>{
        res.json(result) ;
    }).catch((error)=>{
        res.status(500).send(error) ;
    })
})

//ok
app.get('/api/films/:filmId', (req, res)=>{
    console.log(req.params.filmId)
    dao.readFilm(req.params.filmId).then((result)=>{
        res.json(result);
    }).catch((error)=>{
        res.status(500).send(error) ;
    })
})

//favorite ok
//unseen ok
//recentlySeen ok
//bestRated ok
app.get('/api/films/filters/:filter', (req, res)=>{
    dao.filteredFilm(req.params.filter).then((result)=>{
        res.json(result);
    }).catch((error)=>{
        res.status(500).send(error) ;
    })
})

//ok
app.delete('/api/films/:filmId', (req,res)=>{
    dao.deleteFilm(req.params.filmId).then((result)=>{
        res.json(result) ;
    }).catch((error)=>{
        res.status(500).send(error) ;
    })
})

//ok
app.put('/api/films/:filmId', (req,res)=>{
    const film = new Film(req.params.filmId, req.body.Title, req.body.isFavorite, req.body.Date, req.body.Rating) ;
    dao.modifyFilm(film).then((result)=>{
        res.send(result) ;
    }).catch((error)=>{
        res.status(500).send(error) ;
    })
})

//ok
app.put('/api/films/rating/:filmId/:rating', (req,res)=>{
    dao.modifyFilmRating(req.params.filmId, req.params.rating).then((result)=>{
        res.send(result) ;
    }).catch((error)=>{
        res.status(500).send(error) ;
    })

})
//ok
app.put('/api/films/favorite/:filmId', (req,res)=>{
    dao.modifyFilmFavorite(req.params.filmId).then((result)=>{
        res.send(result) ;
    }).catch((error)=>{
        res.status(500).send(error) ;
    })

})



app.listen(3000, ()=>{console.log("Server started")}) ;

