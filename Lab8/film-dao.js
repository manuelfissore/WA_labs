'use strict';

const { Film } = require('./film');

const dayjs = require('dayjs');
const sqlite = require('sqlite3');

const db = new sqlite.Database('film.sqlite', (err) => {
    if (err) throw err;
});

function readFilm(id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM FILM WHERE ID = ?';
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(new Film(id, row.Title, row.isFavorite, row.Date, row.Rating));
            }
        });
    });
}

function createFilm(film) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO FILM (Title, isFavorite, Date, Rating) VALUES(?,?,?,?)';
        // NOTE: question.id is ignored because the database will generate an auto-incremental ID
        db.run(sql, [film.Title, film.isFavorite, dayjs(film.Date).toISOString(), film.Rating], (err) => {
            if (err)
                reject(err.message);
            else
                resolve(true);
        });

    });
}

function deleteFilm(id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM FILM WHERE ID=?';
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
        const sql = 'UPDATE FILM SET Title=?, isFavorite=?, Date=?, Rating=? WHERE ID=?';
        db.run(sql, [film.Title, film.isFavorite, dayjs(film.Date).toISOString(), film.Rating, film.ID], (err) => {
            if (err)
                reject(err.message);
            else
                resolve(film);
        });

    });
}

function listFilms() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM FILM';
        db.all(sql, (err, rows) => {
            if (err)
                reject(err)
            else {
                const films = rows.map((f) => new Film(f.ID, f.Title, f.isFavorite, dayjs(f.Date), f.Rating));
                resolve(films);
            }
        });
    });
}
function filteredFilm(filter) {
    if(filter=='')
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM FILM';
        db.all(sql, (err, rows) => {
            if (err)
                reject(err)
            else {
                const films = rows.map((f) => new Film(f.ID, f.Title, f.isFavorite, dayjs(f.Date), f.Rating));
                resolve(films);
            }
        });
    });
}

function modifyFilmRating(filmID, rating){
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE FILM SET Rating=? WHERE ID=?';
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
        const sql = 'UPDATE FILM SET isFavorite=NOT(isFavorite) WHERE ID=?';
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