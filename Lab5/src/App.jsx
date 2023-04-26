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

let l=[...library];
function App() {
  const [films, setFilm] = useState([...library])
  const [activeFilters, setActiveFilters] = useState('filter_all');


  const filters = {
    filter_all : {label:"filter-all", id:"all", filteredFilms: function() {return l}},
    filter_favorite : {label:"filter-fav", id:"fav", filteredFilms: function(){ return l.filter(film=>film.isFavorite==true)}},
    filter_bestRated : {label:"filter-br", id:"bestRated", filteredFilms: function(){return l.filter(film=>film.Rating==5)}},
    filter_recentlySeen : {label:"filter-rs", id:"recentlySeen", filteredFilms:function(){return l.filter(recentlySeen)}},
    filter_unseen:{label:"filter-unseen", id:"unseen", filteredFilms: function(){return l.filter(film=>films.Date=='undefined')}}
  }

  const recentlySeen = (f) =>{
    const date=dayjs();
    if (f.Date!='undefined' && date.diff(f.Date, 'month')<1)
      return f;
    else return false;
  }

  const deleteFilm = (id) => {
    setFilm((oldFilms) => (oldFilms.filter((f) => (f.ID !== id))));
    l=films;
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
        <Col sm={8}><FilmLibrary films={films} activeFilters={activeFilters} deleteFilm={deleteFilm} filters={filters}/></Col>
      </Row>
    </Container>
  </main>
</>
}

export default App