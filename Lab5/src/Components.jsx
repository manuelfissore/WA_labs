import {React} from 'react'
import { Badge, Button, Col, Form, Row, Table, Container, Navbar, FormCheck } from 'react-bootstrap';
import dayjs from "dayjs";
import { CameraReelsFill, StarFill, Star, Trash} from "react-bootstrap-icons";
import { MDBRadio } from 'mdb-react-ui-kit';

function FilmLibrary(props) {

    const films =[...props.films];
    
    if (films) {
        return (<>
            <FilmDetails films={films} deleteFilm={props.deleteFilm} activeFilter={props.activeFilters}/>
        </>)
    } else {
        return <div>"Film undefined"</div>
    }

   

}

function Filters(props) {
    return (<>
            <div>
                <MDBRadio type="radio" id='All' name='group1' defaultChecked label='All' onChange={()=>{props.activeState('filter_all')}}/>
                <MDBRadio type="radio" id='Fav' name='group1'  label='Favorite' onChange={()=>{props.activeState('fav')}}/>
                <MDBRadio type="radio" id='BR' name='group1' label='Best Rated'onChange={()=>{props.activeState('bestRated')}}/>
                <MDBRadio type="radio" id='RecentSeen' name='group1'  label='Seen Last Month' onChange={()=>{props.activeState('recentSeen')}}/>
                <MDBRadio type="radio" id='Unseen' name='group1' label='Unseen' onChange={()=>{props.activeState('unseen')}}/>
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
                {props.films.map(f => <FilmFiltered key={f.ID} film={f} deleteFilm={props.deleteFilm} activeFilter={props.activeFilter}/>)}
            </tbody>
        </Table>
    </>
}


function FilmFiltered(props) {
    const date = dayjs();
    if(props.activeFilter==='filter_all' || (props.activeFilter==='fav' && props.film.isFavorite) ||(props.activeFilter==='bestRated' && props.film.Rating==5)||
        (props.activeFilter==='recentSeen' && (date.diff(props.film.Date, 'month')<1)) || (props.activeFilter==='unseen' && props.film.Date==='undefined'))
        return (<><FilmRow film={props.film} deleteFilm={props.deleteFilm}/></>)
}
function FilmRow(props){
    return <tr>
    <td>{props.film.Title}</td>
    <td><DisplayFav film={props.film}/> </td>
    <td>{(props.film.Date!='undefined')?props.film.Date.format('YYYY/MM/DD'):''}</td>
    <td>{<RatingStar film={props.film}/>}</td>
    <td><Button variant='warning' onClick={()=>{props.deleteFilm(props.film.ID)}}>{<Trash/>}</Button></td>
</tr>
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
    switch (props.film.Rating){
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



export { FilmLibrary, NameAndLogo, Filters };