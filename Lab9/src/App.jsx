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
import { deleteFilm, listFilm } from './API';

function Film (ID, Title, isFavorite=false, Date, Rating) { 
  this.ID=ID;
  this.Title=Title;
  this.isFavorite=isFavorite;
  this.Date=dayjs(Date);
  this.Rating= Rating;
}

function App() {
  const [films, setFilm] = useState([]);
  const [loading, setLoading] = useState(true) ;

  useEffect(() => {
    // load the list of questions from the API server
    listFilm().then((list) => {
      setFilm(list);
      setLoading(false) ;
    })
  }, []);
/*
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
    setFilm((oldFilms) => (
      oldFilms.map((f)=>(f.ID === Number(film.ID) ? new Film (film.ID, f.Title, (!f.isFavorite), (film.Date===undefined)?undefined:film.Date, f.Rating): f))
      
      ));
  }
  function changeRating(id, newRating){
    setFilm((oldFilms) => (
      oldFilms.map((f)=>(f.ID === Number(id) ? new Film (f.ID, f.Title, f.isFavorite, f.Date, newRating): f))
    ));
    
  }

  */
  return <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<FilmTable films={films} changeRating={changeRating} deleteFilm={deleteFilm}/>}/>
        <Route path='/filter/:filterName'
          element={<FilmTable films={films} changeRating={changeRating} deleteFilm={deleteFilm}/>}/>
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
