/* eslint-disable no-unused-vars */
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
import {listFilm, addFilm, editFilm, changePref, changeRat, deleteFilm} from './API';

function App() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    // load the list of questions from the API server
    listFilm().then((list) => {
      setFilms(list);
      setLoading(false) ;
    })
    //console.log(films);
  }, [loading]);

  function handleDelete(id) {
    deleteFilm(id);
    setLoading(true)
  }

  function handleAdd(film) {
    addFilm(film)
    setLoading(true);
  }

  function handleSave(film){
    editFilm(film)
    setLoading(true)
  }

  function changePreference(id){
    changePref(id)
    setLoading(true)
  }
  function changeRating(id, newRating){
    changeRat(id, newRating)
    setLoading(true)
  }

  
  return <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<FilmTable films={films} setFilms={setFilms} changeRating={changeRating} changePreference={changePreference} deleteFilm={handleDelete}/>}/>
        <Route path='/filter/:filterName'
          element={<FilmTable films={films} setFilms={setFilms} changeRating={changeRating} changePreference={changePreference} deleteFilm={handleDelete}/>}/>
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
