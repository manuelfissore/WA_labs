import { useState } from 'react'
import './App.css'
import {Film} from './film'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar } from 'react-bootstrap';
import { FilmLibrary } from "./Components";

const films= [{
    ID:1, 
    Title: "Pulp Fiction",
    isFavorite: true, 
    Date:('2023-03-07'),
    Rating: 4},
        {
    ID:2, 
    Title: "21 Grams",
    isFavorite: true, 
    Date:('2022-09-22'),
    Rating: 5},
        {
    ID: 3,
    Title:"Star Wars",
    isFavorite:false,
    Date: undefined,
    Rating: 3}
    ];

function App() {
  const [film, setFilm] = useState({ ID: films.ID, Title: films.Title, isFavorite:films.isFavorite, Date: films.Date, Rating: films.Rating});

  const deleteFilm = (id) => {
    //  console.log('Deleting answer '+id);    
    setFilm((oldFilms) => (oldFilms.filter((f) => (f.ID !== id))));
  }

  const actions = {deleteFilm: deleteFilm}


  return <>
  
  <header>
    <Navbar sticky="top" variant='dark' bg="primary" expand="lg" className='mb-3'>
      <Container>
        <Navbar.Brand>HeapOverrun - Film Library</Navbar.Brand> 
        <Navbar.Text>
          Signed in as: Tom
        </Navbar.Text>
      </Container>
    </Navbar>
  </header>
  <main>
      <Container>
        <FilmLibrary films={films} deleteFilm={deleteFilm} />
      </Container>
    </main>
</>
}

export default App