import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import dayjs from 'dayjs';
import { BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';
import { Container, Navbar} from 'react-bootstrap';
import { CameraReelsFill} from "react-bootstrap-icons";
import { PageNotFound } from './routes/PageNotFound';
import {FilmTable} from './routes/FilmTable';
import { AddOrEdit } from './routes/AddOrEditFilm';

function Film (ID, Title, isFavorite=false, Date, Rating) { 
  this.ID=ID;
  this.Title=Title;
  this.isFavorite=isFavorite;
  this.Date=dayjs(Date);
  this.Rating= Rating;
}

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
  const [films, setFilm] = useState([...library]);
  //const [addNewOrEdit, setaddNewOrEdit] = useState('false');
  /*const [activeFilter, setActiveFilter] = useState('filter_all');

  const filters = {
    filter_all : {label:"filter-all", id:"all", filteredFilms: function() {return films}},
    filter_favorite : {label:"filter-fav", id:"fav", filteredFilms: function(){ return films.filter(film=>film.isFavorite==true)}},
    filter_bestRated : {label:"filter-br", id:"bestRated", filteredFilms: function(){return films.filter(film=>film.Rating==5)}},
    filter_recentlySeen : {label:"filter-rs", id:"recentlySeen", filteredFilms:function(){return films.filter(recentlySeen)}},
    filter_unseen:{label:"filter-unseen", id:"unseen", filteredFilms: function(){return films.filter(film=>film.Date=='undefined')}}
  } 
  const recentlySeen = (f) =>{
    const date = dayjs();
    if (f.Date!='undefined' && date.diff(f.Date, 'month')<1)
      return f;
    else return false;
  }
  const changeFilter= (m) => {
    setActiveFilter(m); 
  }
  function changeAddEditMode(m){
    setaddNewOrEdit(m); 
  }
  */

  function deleteFilm(id) {
    setFilm((oldFilms) => (oldFilms.filter((f) => (f.ID !== id))));
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
  function changePreference(film){
    //console.log("change preference" + film.ID+ " ->" + film.Date)
    setFilm((oldFilms) => (
      oldFilms.map((f)=>(f.ID === Number(film.ID) ? new Film (film.ID, f.Title, (!f.isFavorite), (film.Date===undefined)?undefined:film.Date, f.Rating): f))
      
      ));
      //console.log("after changed preference" + film.ID+ " ->" + film.Date)
    //console.log(films.map((f)=>(f.ID === Number(id) ? f.isFavorite : "bruh")))
  }
  function changeRating(id, newRating){
    //console.log("change Rating id:" + id+"-> "+ newRating)
    setFilm((oldFilms) => (
      oldFilms.map((f)=>(f.ID === Number(id) ? new Film (f.ID, f.Title, f.isFavorite, f.Date, newRating): f))
    ));
    
  }

  
  return <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<FilmTable films={films} deleteFilm={deleteFilm} changePreference={changePreference} changeRating={changeRating}/>} />
        <Route path='/filter/:filterName'
          element={<FilmTable films={films} deleteFilm={deleteFilm} changePreference={changePreference} changeRating={changeRating}/>} />
        <Route path='/edit/:id'
          element={<AddOrEdit films={films} handleAdd={handleAdd} handleSave={handleSave} />}/>
        <Route path='/addfilm'
          element={<AddOrEdit films={films} handleAdd={handleAdd} handleSave={handleSave}/>}/>
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>;


}

function MainLayout() {
  return <>
    <header>
      <Navbar sticky="top" variant='dark' bg="primary" expand="lg" className='mb-3'>      
        <Navbar.Brand>
            <CameraReelsFill  color="White" size={30}/>
            <div className='.me-6'> <span className='logoName'>Film Library</span></div>
        </Navbar.Brand> 
    </Navbar>
    </header>
    <main>
        <Container>
            <Outlet/>
        </Container>
    </main>
  </>
}

export default App
