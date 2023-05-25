'use strict';
import dayjs from 'dayjs';


function Film (ID, Title, isFavorite=false, Date, Rating) { 
    this.ID=ID;
    this.Title=Title;
    this.isFavorite=isFavorite;
    this.Date=dayjs(Date);
    this.Rating= Rating;
  }

const _Film = Film;
export { _Film as Film };