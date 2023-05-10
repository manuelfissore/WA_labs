'use strict' ;

const express = require('express') ;
const morgan = require('morgan') ;
const dao = require('./film-dao') ;
const {Film} = require('./film') ;

const app = express() ;
app.use(morgan());
app.use(express.json());

app.post('/api/films', (req,res)=>{
    //console.log(req.body)
    const film = new Film(null, req.body.Title, req.body.isFavorite, req.body.Date, req.body.Rating) ;
    dao.createFilm(film).then((result)=>{
        res.end() ;
    }).catch((error)=>{
        res.status(500).send(error) ;
    })

})

app.get('/api/films', (req, res)=>{
    dao.listFilms().then((result)=>{
        res.json(result) ;
    }).catch((error)=>{
        res.status(500).send(error) ;
    })
})

app.get('/api/films/:filmId', (req, res)=>{
    dao.readFilm(req.params.filmId).then((result)=>{
        res.json(result);
    }).catch((error)=>{
        res.status(500).send(error) ;
    })
})
app.get('/api/films/filter/:filter', (req, res)=>{
    dao.filteredFilm(req.params.filter).then((result)=>{
        res.json(result);
    }).catch((error)=>{
        res.status(500).send(error) ;
    })
})



app.post('/api/films/:filmId', (req, res)=>{
    
})

app.delete('/api/films/:filmId', (req,res)=>{
    dao.deleteFilm(req.params.filmId).then((result)=>{
        res.json(result) ;
    }).catch((error)=>{
        res.status(500).send(error) ;
    })
})

app.put('/api/films/:filmId', (req,res)=>{
    const film = new Film(req.params.filmId, req.body.Title, req.body.isFavorite, req.body.Date, req.body.Rating) ;
    dao.modifyFilm(film).then((result)=>{
        res.send(result) ;
    }).catch((error)=>{
        res.status(500).send(error) ;
    })
})

app.put('/api/films/rating/:filmId/:rating', (req,res)=>{
    dao.modifyFilmRating(req.params.filmId, req.params.rating).then((result)=>{
        res.send(result) ;
    }).catch((error)=>{
        res.status(500).send(error) ;
    })

})

app.put('/api/films/favorite/:filmId', (req,res)=>{
    dao.modifyFilmFavorite(req.params.filmId).then((result)=>{
        res.send(result) ;
    }).catch((error)=>{
        res.status(500).send(error) ;
    })

})



app.listen(3000, ()=>{console.log("Server started")}) ;

