import {React, useState} from 'react'
import { Badge, Button, Col, Form, Row, Table, Container, Navbar, FormCheck } from 'react-bootstrap';
import dayjs from "dayjs";
import { CameraReelsFill, StarFill, Star, Trash, PencilSquare} from "react-bootstrap-icons";
import { MDBRadio } from 'mdb-react-ui-kit';
import { EditOrNewFilm } from './AnswerForm';

function FilmLibrary(props) {
    const[filmToEdit, setFilmToEdit] = useState(null);
    
    if (props.films) {
        return (<>
        <FilmDetails films={props.films} deleteFilm={props.deleteFilm} activeFilter={props.activeFilters} filters={props.filters}  changeAddEditMode={props.changeAddEditMode} setFilmToEdit={setFilmToEdit} />
        {props.addNewOrEdit=='add' &&  <EditOrNewFilm addNewOrEdit={props.addNewOrEdit} changeAddEditMode={props.changeAddEditMode} handleAdd={props.handleAdd}/>}
        {props.addNewOrEdit=='edit' && <EditOrNewFilm key={filmToEdit.ID} film={(filmToEdit!=null)?filmToEdit:console.log('film non passato correttamente')} addNewOrEdit={props.addNewOrEdit} changeAddEditMode={props.changeAddEditMode} handleSave={props.handleSave}/>}
        </>)
    }
}

function Filters(props) {
    return (<>
            <div>
                <Col xs={6}>
                    <MDBRadio type="radio" id='All' name='group1' defaultChecked label='All' onChange={()=>{props.activeState('filter_all')}}/>
                    <MDBRadio type="radio" id='Fav' name='group1'  label='Favorite' onChange={()=>{props.activeState('filter_favorite')}}/>
                    <MDBRadio type="radio" id='BR' name='group1' label='Best Rated'onChange={()=>{props.activeState('filter_bestRated')}}/>
                    <MDBRadio type="radio" id='RecentSeen' name='group1'  label='Seen Last Month' onChange={()=>{props.activeState('filter_recentlySeen')}}/>
                    <MDBRadio type="radio" id='Unseen' name='group1' label='Unseen' onChange={()=>{props.activeState('filter_unseen')}}/>
                </Col>
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
                <FilmFiltered deleteFilm={props.deleteFilm} activeFilter={props.activeFilter} filters={props.filters} changeAddEditMode={props.changeAddEditMode} setFilmToEdit={props.setFilmToEdit}/>
            </tbody>
        </Table>
    </>
}


function FilmFiltered(props) {
    const date = dayjs();
    return <>{props.filters[props.activeFilter].filteredFilms().map(f => <FilmRow key={f.ID} film={f} deleteFilm={props.deleteFilm} changeAddEditMode={props.changeAddEditMode} setFilmToEdit={props.setFilmToEdit}/>)}</>
}


function FilmRow(props){
    return (<>
        <tr>
            <td>{props.film.Title}</td>
            <td><DisplayFav film={props.film}/> </td>
            <td>{(props.film.Date=='undefined')?'':(props.film.Date.format('YYYY/MM/DD'))}</td>
            <td>{<RatingStar film={props.film}/>}</td>
            <td><Button variant='primary' onClick={()=>{{{props.changeAddEditMode('edit'); props.setFilmToEdit(props.film)}}}}>{<PencilSquare/>}</Button></td>
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
    if(props.addNewOrEdit=='false')
        return (<><Button variant="primary" onClick={() => props.changeAddEditMode('add')}> Add a new film</Button> </>)
}

export { FilmLibrary, NameAndLogo, Filters, AddFilm};