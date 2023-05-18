import { useState, useEffect  } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import dayjs from 'dayjs';
import {Film} from './film'
import { BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';
import { Container, Navbar} from 'react-bootstrap';
import { CameraReelsFill} from "react-bootstrap-icons";
import { PageNotFound } from './routes/PageNotFound';
import {FilmTable} from './routes/FilmTable';
import { AddOrEdit } from './routes/AddOrEditFilm';
import {listFilm} from './API';

function App() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    // load the list of questions from the API server
    listFilm().then((list) => {
      setFilms(list);
      setLoading(false) ;
    })
  }, []);


  function deleteFilm(id) {
    setFilms((oldFilms) => (oldFilms.filter((f) => (f.ID !== id))));
  }

  function handleAdd(title, isFavorite, Date, Rating) {
    
    setFilms((oldFilms) => {
      const newId = Math.max(...oldFilms.map(f => f.ID)) + 1;
      const newFilm = new Film(newId, title, isFavorite, Date, Rating);
      return [...oldFilms, newFilm];
    });
  }

  function handleSave(id, title, isFavorite, Date, Rating){
    setFilms((oldFilms) => (
      oldFilms.map((f)=>(f.ID === Number(id) ? new Film (id, title, isFavorite, Date, Rating): f))
    ));
  }
  function changePreference(film){
    setFilms((oldFilms) => (
      oldFilms.map((f)=>(f.ID === Number(film.ID) ? new Film (film.ID, f.Title, (!f.isFavorite), (film.Date===undefined)?undefined:film.Date, f.Rating): f))
      
      ));
  }
  function changeRating(id, newRating){
    setFilms((oldFilms) => (
      oldFilms.map((f)=>(f.ID === Number(id) ? new Film (f.ID, f.Title, f.isFavorite, f.Date, newRating): f))
    ));
    
  }

  
  return <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<FilmTable films={films} setFilms={setFilms} changeRating={changeRating} changePreference={changePreference} deleteFilm={deleteFilm}/>}/>
        <Route path='/filter/:filterName'
          element={<FilmTable films={films} setFilms={setFilms} changeRating={changeRating} changePreference={changePreference} deleteFilm={deleteFilm}/>}/>
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
