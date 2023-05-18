import { Film } from "./film.js";

const APIURL = 'http://localhost:3000/api'

async function listFilm() {
    try {
        const response = await fetch(APIURL+'/films');
        if (response.ok) {
            const films = await response.json();
            return films ;
        } else {
            // if response is not OK
            const message = await response.text() ;
            throw new Error("Application error: "+message) ;
        }
    } catch (error) {
        throw new Error("Network error: "+error.message)
    }
}

async function listFilteredFilm(filter) {
    try {
        const response = await fetch(APIURL+`/films/filters/${filter}`);
        if (response.ok) {
            const films = await response.json();
            return films ;
        } else {
            // if response is not OK
            const message = await response.text() ;
            throw new Error("Application error: "+message) ;
        }
    } catch (error) {
        throw new Error("Network error: "+error.message)
    }
}



export { listFilm, listFilteredFilm };