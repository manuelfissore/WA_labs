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
    Date: dayjs('2023-04-15'),
    Rating: 4},
        {
    ID:2, 
    Title: "21 Grams",
    isFavorite: true, 
    Date:'undefined',
    Rating: 5},
        {
    ID: 3,
    Title:"Star Wars",
    isFavorite:false,
    Date: dayjs('2023-02-15'),
    Rating: 3}
    ];

function App() {
  const [films, setFilm] = useState([...library])
  const [activeFilters, setActiveFilters] = useState('filter_all');

  const recentlySeen = (d) =>{
    const date=dayjs();
    if (date.diff(d, 'month')<1)
      return true;
    else return false;
  }
  const filters = {
    filter_all : {label:"filter-all", id:"all", funcion: {}},
    filter_favorite : {label:"filter-fav", id:"fav", function: function(){films.filter(film=>film.isFavorite==true)}},
    filter_bestRated : {label:"filter-br", id:"bestRated", function: function(){films.filter(film=>film.Rating==5)}},
    filter_recentlySeen : {label:"filter-rs", id:"recentlySeen", function:function(){films.filter(film=>films.recentlySeen(film.Date))}},
    filter_unseen:{label:"filter-unseen", id:"unseen", function:function(){films.filter(film=>films.Date=='undefined')}}
  }

  const deleteFilm = (id) => {
    setFilm((oldFilms) => (oldFilms.filter((f) => (f.ID !== id))));
  }

  const activeState = (m) => {
    setActiveFilters(m); 
  }

  const actions = {deleteFilm: deleteFilm}


  return <>
  
  <header>
    <NameAndLogo/>
  </header>
  <main>
    <Container>
      <Row>
        <Col sm={4}><Filters activeState={activeState}/></Col>
        <Col sm={8}><FilmLibrary films={films} activeFilters={activeFilters} deleteFilm={deleteFilm}/></Col>
      </Row>
    </Container>
  </main>
</>
}

export default App