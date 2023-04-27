import {React} from 'react'
import { Badge, Button, Col, Form, Row, Table, Container, Navbar, FormCheck } from 'react-bootstrap';
import dayjs from "dayjs";
import { CameraReelsFill, StarFill, Star, Trash} from "react-bootstrap-icons";
import { MDBRadio } from 'mdb-react-ui-kit';
import { NewFilmForm } from './AnswerForm';

function FilmLibrary(props) {
    if (props.films) {
        console.log("FilmLibrary, props.film belove")
        console.log(props.films);
        return (<>
            <FilmDetails films={props.films} deleteFilm={props.deleteFilm} activeFilter={props.activeFilters} filters={props.filters}/>
        </>)
    } else {
        return <div>"Film undefined"</div>
    }

   

}

function Filters(props) {
    return (<>
            <div>
                <MDBRadio type="radio" id='All' name='group1' defaultChecked label='All' onChange={()=>{props.activeState('filter_all')}}/>
                <MDBRadio type="radio" id='Fav' name='group1'  label='Favorite' onChange={()=>{props.activeState('filter_favorite')}}/>
                <MDBRadio type="radio" id='BR' name='group1' label='Best Rated'onChange={()=>{props.activeState('filter_bestRated')}}/>
                <MDBRadio type="radio" id='RecentSeen' name='group1'  label='Seen Last Month' onChange={()=>{props.activeState('filter_recentlySeen')}}/>
                <MDBRadio type="radio" id='Unseen' name='group1' label='Unseen' onChange={()=>{props.activeState('filter_unseen')}}/>
            </div>
    </>
    )
}

function NameAndLogo(props) {
    return <>
    <Navbar sticky="top" variant='dark' bg="primary" expand="lg" className='mb-1'>
    <Container>
        
        <Navbar.Brand>
            <CameraReelsFill  color="White" size={40}/>
            <div className='.me-5'> <span >Film Library</span></div>
           
        </Navbar.Brand> 
    </Container>
  </Navbar>
  </>
}



function FilmDetails(props) {
    return <>
        <Table hover>
            <thead >
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Favorite?</th>
                    <th scope="col">Date</th>
                    <th scope="col">Rating</th>
                </tr>
            </thead>
            <tbody>
                <FilmFiltered deleteFilm={props.deleteFilm} activeFilter={props.activeFilter} filters={props.filters}/>
            </tbody>
        </Table>
    </>
}


function FilmFiltered(props) {
    const date = dayjs();
    return <>{props.filters[props.activeFilter].filteredFilms().map(f => <FilmRow key={f.ID} film={f} deleteFilm={props.deleteFilm}/>)}</>
}

function FilmRow(props){
    console.log("FilmRow, film by film by copy belove")
    console.log(props.film);
    return (<>
    <tr>
        <td>{props.film.Title}</td>
        <td><DisplayFav film={props.film}/> </td>
        <td>{(props.film.Date=='undefined')?'':(props.film.Date.format('YYYY/MM/DD'))}</td>
        <td>{<RatingStar film={props.film}/>}</td>
        <td><Button variant='warning' onClick={()=>{props.deleteFilm(props.film.ID)}}>{<Trash/>}</Button></td>
    </tr>
    </>)
}

function DisplayFav(props){
    
    if(props.film.isFavorite){
        return (<>
            <Form.Group controlId="formBasicCheckBox">
                <Form.Check type="checkbox" disabled defaultChecked/>
            </Form.Group>
        </>
    )}
    else{
        return (<>
            <Form.Group controlId="formBasicCheckBox">
                <Form.Check type="checkbox" disabled/>
            </Form.Group>
        </>
        
    )}
}  

function RatingStar(props){
    switch (Number(props.film.Rating)){
        case 1:
            return (<>
                <span><StarFill /></span>
                <span><Star /></span>
                <span><Star /></span>
                <span><Star /></span>
                <span><Star /></span>
            </>)
        case 2:
            return (<>
                <span><StarFill /></span>
                <span><StarFill /></span>
                <span><Star /></span>
                <span><Star /></span>
                <span><Star /></span>
            </>)
        case 3:
            return (<>
                <span><StarFill /></span>
                <span><StarFill /></span>
                <span><StarFill /></span>
                <span><Star /></span>
                <span><Star /></span>
            </>)
        case 4:
            return (<>
                <span><StarFill /></span>
                <span><StarFill /></span>
                <span><StarFill /></span>
                <span><StarFill /></span>
                <span><Star /></span>
            </>)
        case 5:
            return (<>
                <span><StarFill /></span>
                <span><StarFill /></span>
                <span><StarFill /></span>
                <span><StarFill /></span>
                <span><StarFill /></span>
            </>)
        default:
            return (<>
                <span><Star /></span>
                <span><Star /></span>
                <span><Star /></span>
                <span><Star /></span>
                <span><Star /></span>
            </>)
    }
}

function AddFilm(props){
    if(props.addNew=='false')
        return (<><Button variant="primary" onClick={() => props.changeAddMode('add')}> Add a new film</Button> </>)
    if(props.addNew=='add')
    return (<>
        <NewFilmForm changeAddMode={props.changeAddMode} handleAdd={props.handleAdd}></NewFilmForm>
        </>)
       
    
}

export { FilmLibrary, NameAndLogo, Filters, AddFilm };