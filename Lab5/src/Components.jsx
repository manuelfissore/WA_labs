import { Badge, Button, Col, Form, Row, Table, Container, Navbar, FormCheck} from 'react-bootstrap';
import dayjs from "dayjs";
import { CameraReelsFill } from "react-bootstrap-icons";

function FilmLibrary(props) {

    const films = props.films;
  
    if (films) {
        return (<>
            <FilmDetails films={films} deleteFilm={props.deleteFilm} />
        </>)
    } else {
        return <div>"Film undefined"</div>
    }

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
                {props.films.map(f => <FilmRow key={f.ID} film={f} deleteFilm={props.deleteFilm} />)}
            </tbody>
        </Table>
    </>
}


function FilmRow(props) {
    return <tr>
        <td>{props.film.Title}</td>
        <td><DisplayFav film={props.film}/> </td>
        <td>{props.film.Date.format('YYYY/MM/DD')}</td>
        <td>{props.film.Rating}</td>
        <td><Button variant='warning' onClick={()=>{props.deleteFilm(props.film.ID)}}>DELETE</Button></td>
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



export { FilmLibrary, NameAndLogo };