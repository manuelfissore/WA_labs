'use strict';

const { Film } = require('./film');

const dayjs = require('dayjs');
const sqlite = require('sqlite3');

const db = new sqlite.Database('films.db', (err) => {
    if (err) throw err;
});

function readFilm(id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM films WHERE id=?';
        db.all(sql,[id], (err, row) => {
            if (err)
                reject(err)
            else {
                const film = new Film(row.id, row.title, row.favorite, row.watchdate, row.rating);
                resolve(film);
            }
        });
    });
}

function createFilm(film) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO films (title, favorite, watchdate, rating, user) VALUES(?,?,?,?,?)';
        db.run(sql, [film.Title, film.isFavorite, (film.Date==null)?null:dayjs(film.Date).format('YYYY-MM-DD').toString(), film.Rating, 1], (err) => {
            if (err)
                reject(err.message);
            else
                resolve(true);
        });

    });
}

function deleteFilm(id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM films WHERE id=?';
        db.run(sql, [id], (err) => {
            if (err)
                reject(err.message);
            else
                resolve(true);
        });

    });
}

function modifyFilm(film) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE films SET title=?, favorite=?, watchdate=?, rating=? WHERE id=?';
        db.run(sql, [film.Title, film.isFavorite, (film.Date==null)?null:dayjs(film.Date).format('YYYY-MM-DD').toString(), film.Rating, film.ID], (err) => {
            if (err)
                reject(err.message);
            else
                resolve(film);
        });

    });
}

function listFilms() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM films';
        db.all(sql, (err, rows) => {
            if (err)
                reject(err)
            else {
                const films = rows.map((row) => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));
                resolve(films);
            }
        });
    });
}
function filteredFilm(filter) {
    let sql;
    if(filter=='favorite')
         sql = 'SELECT * FROM films WHERE favorite=1';
    else if(filter=='bestRated')
         sql = 'SELECT * FROM films WHERE rating=5';
    else if(filter=='recentlySeen')
         sql = 'SELECT * FROM films WHERE watchdate>=DATE("now", "-1 month")';
    else if(filter=='unseen')
         sql = 'SELECT * FROM films WHERE watchdate=null'; //non va
    else if (filter=='filterAll')
         sql = 'SELECT * FROM films'
    return new Promise((resolve, reject) => {
        db.all(sql, (err, rows) => {
            if (err)
                reject(err)
            else {
                const films = rows.map((row) => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));
                resolve(films);
            }
        });
    });
}

function modifyFilmRating(filmID, rating){
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE films SET rating=? WHERE id=?';
        db.run(sql, [rating, filmID], (err) => {
            if (err)
                reject(err.message);
            else
                resolve(rating);
        });

    });
}
function modifyFilmFavorite(filmID){
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE films SET favorite=NOT(favorite) WHERE id=?';
        db.run(sql, [filmID], (err) => {
            if (err)
                reject(err.message);
            else
                resolve(true);
        });

    });
}





exports.listFilms = listFilms ;
exports.readFilm = readFilm ;
exports.createFilm = createFilm ;
exports.deleteFilm = deleteFilm ;
exports.modifyFilm= modifyFilm;
exports.modifyFilmFavorite = modifyFilmFavorite;
exports.modifyFilmRating = modifyFilmRating;
exports.filteredFilm = filteredFilm;