import { useState } from 'react'
import './App.css'
import {Film} from './film'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Col, Row} from 'react-bootstrap';
import { FilmLibrary, NameAndLogo, Filters, AddFilm} from "./Components";
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
  const [addNewOrEdit, setaddNewOrEdit] = useState('false')
  const [activeFilters, setActiveFilters] = useState('filter_all');


  const filters = {
    filter_all : {label:"filter-all", id:"all", filteredFilms: function() {return films}},
    filter_favorite : {label:"filter-fav", id:"fav", filteredFilms: function(){ return films.filter(film=>film.isFavorite==true)}},
    filter_bestRated : {label:"filter-br", id:"bestRated", filteredFilms: function(){return films.filter(film=>film.Rating==5)}},
    filter_recentlySeen : {label:"filter-rs", id:"recentlySeen", filteredFilms:function(){return films.filter(recentlySeen)}},
    filter_unseen:{label:"filter-unseen", id:"unseen", filteredFilms: function(){return films.filter(film=>film.Date=='undefined')}}
  }

  const recentlySeen = (f) =>{
    const date=dayjs();
    if (f.Date!='undefined' && date.diff(f.Date, 'month')<1)
      return f;
    else return false;
  }

  const deleteFilm = (id) => {
    setFilm((oldFilms) => (oldFilms.filter((f) => (f.ID !== id))));
  }

  const activeState = (m) => {
    setActiveFilters(m); 
  }

  function changeAddEditMode(m){
    setaddNewOrEdit(m); 
  }

  function handleAdd(title, isFavorite, Date, Rating) {
    setFilm((oldFilms) => {
      const newId = Math.max(...oldFilms.map(f => f.ID)) + 1;
      const newFilm = new Film(newId, title, isFavorite, Date, Rating);
      return [...oldFilms, newFilm];
    });
  }
  function handleSave(id, title, isFavorite, Date, Rating){
    setFilm((oldFilms) => (
      oldFilms.map((f)=>(f.ID === Number(id) ? new Film (id, title, isFavorite, Date, Rating): f))
    ));
  }

  return <>
  
  <header>
    <NameAndLogo/>
  </header>
  <main>
    <Container>
      <Row>
        <Col sm={4}><Filters activeState={activeState}/></Col>
        <Col sm={8}>
          <FilmLibrary films={films} activeFilters={activeFilters} deleteFilm={deleteFilm} filters={filters} addNewOrEdit={addNewOrEdit} changeAddEditMode={changeAddEditMode} handleSave={handleSave} handleAdd={handleAdd}/>
          <AddFilm addNewOrEdit={addNewOrEdit} changeAddEditMode={changeAddEditMode}/>
        </Col>
      </Row>
    </Container>
  </main>
</>
}

export default App