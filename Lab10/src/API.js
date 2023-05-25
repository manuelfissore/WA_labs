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

async function addFilm(film) {
    try {
        console.log(film)
        const response = await fetch(APIURL+`/films`,{
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(film)
        });
        if (response.ok) {
            return;
        } else {
            // if response is not OK
            const message = await response.text() ;
            throw new Error("Application error: "+message) ;
        }
    } catch (error) {
        throw new Error("Network error: "+error.message)
    }
}


async function editFilm(film) {
    try {
        const response = await fetch(APIURL+`/films/${film.ID}`,{
            method: 'PUT',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(film)
        });
        if (response.ok) {
            return;
        } else {
            // if response is not OK
            const message = await response.text() ;
            throw new Error("Application error: "+message) ;
        }
    } catch (error) {
        throw new Error("Network error: "+error.message)
    }
}

async function changePref(id){
    try{
        const response=await fetch(APIURL+`/films/favorite/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': "application/json"
            }
        });
        if (response.ok) {
            return;
        } else {
            // if response is not OK
            const message = await response.text() ;
            throw new Error("Application error: "+message) ;
        }
    }catch (error) {
    throw new Error("Network error: "+error.message)
    }
}


async function changeRat(id, rating){
    try{
        const response=await fetch(APIURL+`/films/rating/${id}/${rating}`,{
            method: 'PUT',
            headers: {
                'Content-Type': "application/json"
            }
        });
        if (response.ok) {
            return;
        } else {
            // if response is not OK
            const message = await response.text() ;
            throw new Error("Application error: "+message) ;
        }
    }catch (error) {
    throw new Error("Network error: "+error.message)
    }
}

async function deleteFilm(id){
    try{
        const response=await fetch(APIURL+`/films/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json"
            }
        });
        if (response.ok) {
            return;
        } else {
            // if response is not OK
            const message = await response.text() ;
            throw new Error("Application error: "+message) ;
        }
    }catch (error) {
    throw new Error("Network error: "+error.message)
    }
}



export { listFilm, listFilteredFilm, addFilm, editFilm, changePref, changeRat, deleteFilm};