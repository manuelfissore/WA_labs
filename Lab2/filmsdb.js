'use strict';

const sqlite = require('sqlite3');
const dayjs = require('dayjs');
const { resolve } = require('path');
const { rejects } = require('assert');

const db = new sqlite.Database('films.db', (err)=>{if (err) throw err;});

function Film(id, title, isFavorite = false, watchDate, rating) {
    this.id = id;
    this.title = title;
    this.favorite = isFavorite;
    this.rating = rating;
    // saved as dayjs object
    this.watchDate = dayjs(watchDate);
  
  
    this.formatWatchDate = (format) => {
      return this.watchDate ? this.watchDate.format(format) : '<not defined>';
    }
  
    this.formatRating = () => {
      return this.rating  ? this.rating : '<not assigned>';
    }

    this.toString = () => {
        return `Id: ${this.id}, ` +
        `Title: ${this.title}, Favorite: ${this.favorite}, ` +
        `Watch date: ${this.formatWatchDate('MMMM D, YYYY')}, ` +
        `Score: ${this.formatRating()}` ;
      }

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films';
            db.all(sql, [], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    const films =rows.map(row => new Film(row.id, row.title, row.favorite, dayjs(row.watchdate),  row.rating));
                    resolve(films);
                }
            });
        });
    };
    this.getAllFavorite = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE favorite=1';
            db.all(sql, [], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    const films =rows.map(row => new Film(row.id, row.title, row.favorite, dayjs(row.watchdate),  row.rating));
                    resolve(films);
                }
            });
        });
    };
  

    this.getAllWatchedToday = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE watchdate=DATE()';
            db.all(sql, [], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    const films =rows.map(row => new Film(row.id, row.title, row.favorite, dayjs(row.watchdate),  row.rating));
                    resolve(films);
                }
            });
        });
    }
    this.getAllWatchedBefore = (date) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE watchdate<?';
            db.all(sql, [date], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    const films =rows.map(row => new Film(row.id, row.title, row.favorite, dayjs(row.watchdate),  row.rating));
                    resolve(films);
                }
            });
        });
    }
    this.getAllRatedMoreThan= (rate) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE rating>=?';
            db.all(sql, [rate], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    const films =rows.map(row => new Film(row.id, row.title, row.favorite, dayjs(row.watchdate),  row.rating));
                    resolve(films);
                }
            });
        });
    }
    this.getAllContainigSting= (string) => {
        string="%"+string+"%";
        console.log(string);
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE title LIKE ?';
            db.all(sql, [string], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    const films =rows.map(row => new Film(row.id, row.title, row.favorite, dayjs(row.watchdate),  row.rating));
                    resolve(films);
                }
            });
        });
    }
}
function FilmLibrary() {
    this.list = [];
    this.addNewFilm = (film) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO films(id,title,favorite,watchdate,rating) VALUES(?, ?, ?, DATE(?), ?)';
            db.run(sql, [film.id, film.title, film.favorite, film.formatWatchDate('YYYY-MM-DD'), film.rating], function (err) {
              if (err) reject(err);
              else resolve(this.lastID);
            });
        });
    };
  
    this.deleteFilm = (id) => {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM films WHERE id=?';
            db.run(sql, [film.id], function (err) {
              if (err) reject(err);
              else resolve(this.lastID);
            });
        });
    }
  
    
    this.resetWatchedFilms = () => {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE films SET watchdate=NULL';
            db.run(sql, [], function (err) {
              if (err) reject(err);
              else resolve(this.lastID);
            });
        });
    }
      /*
    
  
    this.getRated = () => {
      const newList = this.list.filter(function(film, index, arr) {
        return film.rating > 0;
      })
      return newList;
    }
  
    this.sortByDate = () => {
      const newArray = [...this.list];
      newArray.sort((d1, d2) => {
        if(!(d1.watchDate)) return  1;   // null/empty watchDate is the lower value
        if(!(d2.watchDate)) return -1;
        return d1.watchDate.diff(d2.watchDate, 'day')
      });
      return newArray;
    }
  */
  }
  

function printList(list, name) {
    console.log(name);
    for (const a of list)
      console.log(a.toString());
}
const film = new Film;
const library = new FilmLibrary;


film.getAll().then((list)=>{
    printList(list, "---All---");
    console.log("\n");
}).catch(console.log("error 'getAll'"));

film.getAllFavorite().then((list)=>{
    printList(list, "---Favorite---");
    console.log("\n");
}).catch(console.log("error 'AllFavorite'"));

film.getAllWatchedToday().then((list)=>{
    printList(list, "---Watched today---");
    console.log("\n");
}).catch(console.log("error 'WatchedToday'"));

const date = "2023-03-17";
film.getAllWatchedBefore(date).then((list)=>{
    printList(list, "---Watch before " + date + "---");
    console.log("\n");
}).catch(console.log("error 'ContainigSting'"));

const rate="2"
film.getAllRatedMoreThan(rate).then((list)=>{
    printList(list, "---Rated more than " + rate + "---");
    console.log("\n");
}).catch(console.log("error 'RatedMoreThan'"));

const string="ulp"
film.getAllContainigSting(string).then((list)=>{
    printList(list, "---Contains " + string + " inside---");
    console.log("\n");
}).catch(console.log("error 'ContainigSting'"));

const now=dayjs();
//const f = new Film(6, 'Le iene', true, "2023-03-17", 4);

/*
const f1 = new Film(11, 'Harry Potter e il calice di fuoco', false, '2018-05-16', 2);
async function load() {
    let id1;
    id1 = await library.addNewFilm(f1);
}

load().then( ()=> console.log("load ended"));   
*/

library.resetWatchedFilms().then(console.log("reset watched"));
//library.deleteFilm(11).then(console.log("id=11 is deleted")).catch("error 'deleteFilm'");