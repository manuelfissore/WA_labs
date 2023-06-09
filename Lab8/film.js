'use strict';
const dayjs = require('dayjs');

function Film(ID, Title, isFavorite, Date, Rating){ 
    this.ID=ID;
    this.Title=Title;
    this.isFavorite=isFavorite;
    this.Date=(Date==null)?null:dayjs(Date);
    this.Rating= Rating;
}

exports.Film = Film;