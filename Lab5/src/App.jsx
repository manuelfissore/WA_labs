import { useState } from 'react'
import './App.css'
import {Film} from './film'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container} from 'react-bootstrap';
import { FilmLibrary, NameAndLogo } from "./Components";
import dayjs, { Dayjs } from 'dayjs';

const library= [{
    ID:1, 
    Title: "Pulp Fiction",
    isFavorite:true, 
    Date: dayjs('2023-02-15'),
    Rating: 4},
        {
    ID:2, 
    Title: "21 Grams",
    isFavorite: true, 
    Date:dayjs('2023-02-15'),
    Rating: 5},
        {
    ID: 3,
    Title:"Star Wars",
    isFavorite:false,
    Date: dayjs('2023-02-15'),
    Rating: 3}
    ];

function App() {
  const [films, setFilm] = useState([ ...library]);

  const deleteFilm = (id) => {
    setFilm((oldFilms) => (oldFilms.filter((f) => (f.ID !== id))));
  }

  const actions = {deleteFilm: deleteFilm}


  return <>
  
  <header>
    <NameAndLogo/>
  </header>
  <main>
      <Container>
        <FilmLibrary films={films} deleteFilm={deleteFilm} />
      </Container>
    </main>
</>
}

export default App