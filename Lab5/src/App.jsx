import { useState } from 'react'
import './App.css'
import {Film} from './film'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Col, Row} from 'react-bootstrap';
import { FilmLibrary, NameAndLogo, Filters } from "./Components";
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
  const [mode, setMode] = useState('All');

  const deleteFilm = (id) => {
    setFilm((oldFilms) => (oldFilms.filter((f) => (f.ID !== id))));
  }

  const modifyMode = (m) => {
    setMode(m); 
  }

  const actions = {deleteFilm: deleteFilm}


  return <>
  
  <header>
    <NameAndLogo/>
  </header>
  <main>
    <Container>
      <Row>
        <Col sm={4}><Filters modifyMode={modifyMode}/></Col>
        <Col sm={8}><FilmLibrary films={films} mode={mode} deleteFilm={deleteFilm} modifyMode={modifyMode} /></Col>
      </Row>
    </Container>
  </main>
</>
}

export default App