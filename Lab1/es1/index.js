"use strinct mode"
const dayjs = require("dayjs")

function FilmLibrary(){
    this.filmLibrary= []
    this.addNewFilm = (x)=>{this.filmLibrary.push(x)}
}

function createFilm(ID, Title, isFavorite=False, Date, Rating){
    const film = {
        ID: ID,
        Title:Title,
        isFavorite:isFavorite,
        Date:Date,
        Rating: Rating
        }
    return film;

}

const library = new FilmLibrary();

const films= [{
    ID:1, 
    Title: "Pulp Fiction",
    isFavorite: true, 
    Date:"March 10, 2023",
    Rating: 4},
        {
    ID:2, 
    Title: "21 Grams",
    isFavorite: true, 
    Date:"March 17, 2023",
    Rating: 5},
        {
    ID: 3,
    Title:"Star Wars",
    isFavorite:false,
    Date:undefined,
    Rating: 3}
    ];

films.forEach(x => {
    if (x.ID==undefined || x.Title==undefined)
        console.log("ID and Title are mandatory");
    else
        library.addNewFilm(createFilm(x.ID, x.Title, x.isFavorite, x.Date, x.Rating));
});

library.filmLibrary.forEach(x => {
    console.log(x);
});
