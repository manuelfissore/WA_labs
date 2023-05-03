import { useState } from 'react'
import './App.css'
import {Film} from './film'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Col, Row} from 'react-bootstrap';
import { FilmLibrary, Filters, AddFilm} from "./Components";
import {NameAndLogo} from "./Nav"
import {Filters} from "./Filter"
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
  const [activeFilter, setActiveFilter] = useState('filter_all');

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
    setActiveFilter(m); 
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
  return <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<FilmTable films={films} />} />
        <Route path='/filter/:filtername'
          element={<AnswersList films={films} filter={activeFilter}/>} />
        <Route path='/addAnswer/:idQuestion'
          element={<AddAnswer addAnswer={addAnswer}/>} />
        <Route path='/editAnswer/:idQuestion/:idAnswer'
          element={<EditAnswer questions={questions} answers={answers} editAnswer={editAnswer} />} />
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>;


}

function MainLayout() {
  const { idFilm } = useParams();
  return <>
    <header>
      <NameAndLogo/>
    </header>
    <main>
      <Container>
        <Col>
          <Filters/>
        </Col>
        <Col>
          <Outlet/>
        </Col>
      </Container>
    </main>

  </>
}

export default App
