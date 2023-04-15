'use strict';
import dayjs from 'dayjs';

function Film(ID, Title, isFavorite=False, Date, Rating){ 
    this.ID=ID;
    this.Title=Title;
    this.isFavorite=isFavorite;
    this.Date=dayjs(Date);
    this.Rating= Rating;
}

export {Film} ;