/* eslint-disable react/prop-types */
import { Button, Col, Form, Table} from 'react-bootstrap';
import { Trash, PencilSquare} from "react-bootstrap-icons";
import {Filters} from "./Filter"
import { useNavigate, useParams } from "react-router-dom";
import { StarRating } from './StarRating';
import dayjs from 'dayjs';
import "./Table.css"
import { AddFilm } from './AddFilm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'react-bootstrap/esm';


function FilmTable(props) {
    const {filterName} =  useParams();
    const navigate = useNavigate();

    function handleEdit(id) {
        navigate(`/editFilm/${id}`);
    }
    const handleDelete = (id) => {
        props.deleteFilm(id);
    }
    const handleChangePreference = (f) => {
        //console.log("handle Preference " + id)
        props.changePreference(f);
    }

    if (props.films) {
        return (<>
            <div className='centerTable'>
                <Row>
                    <Col sm={4} >
                        <Filters filter={filterName}/>
                    </Col>
                    <Col sm={8}>
                        <FilmDetails films={props.films} activeFilter={filterName} handleEdit={handleEdit} handleDelete={handleDelete} handleChangePreference={handleChangePreference} changeRating={props.changeRating}/>
                    </Col>
                </Row>
            </div> 
        </>)
    }
}
function FilmDetails(props) {
    return <>
        <Table >
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Favorite?</th>
                    <th scope="col">Date</th>
                    <th scope="col">Rating</th>
                </tr>
            </thead>
            <tbody>
                {props.films.map(f => <FilmFiltered key={f.ID} film={f} activeFilter={props.activeFilter} handleEdit={props.handleEdit} handleDelete={props.handleDelete}  handleChangePreference={props.handleChangePreference} changeRating={props.changeRating}/>)}
            </tbody>
        </Table>
        <AddFilm/>
    </>
}

function FilmFiltered(props) {
    const date = dayjs();
    if (props.activeFilter===undefined)
        return (<><tr><FilmRow film={props.film} handleDelete={props.handleDelete} handleChangePreference={props.handleChangePreference} changeRating={props.changeRating}/></tr></>)
    else if (props.activeFilter==null || (props.activeFilter==='favorite' && props.film.isFavorite) ||(props.activeFilter==='bestRated' && props.film.Rating==5)||
    (props.activeFilter==='recentlySeen' && (date.diff(props.film.Date, 'month')<1)) || (props.activeFilter==='unseen' && (props.film.Date==='undefined'||isNaN(props.film.Date))))
        return (<><tr><FilmRow film={props.film} handleDelete={props.handleDelete} handleChangePreference={props.handleChangePreference} changeRating={props.changeRating}/></tr></>)
    
}

function FilmRow(props){
    const navigate = useNavigate();
    //console.log("date of film"+props.film.ID+"->"+props.film.Date);
    return (<>
            <td>{props.film.Title}</td>
            <td><DisplayFav film={props.film} handleChangePreference={props.handleChangePreference}/> </td>
            <td>{((props.film.Date=='Invalid Date')||(props.film.Date=='undefined')||(props.film.Date===undefined)||isNaN(props.film.Date))?' ':(props.film.Date.format('YYYY/MM/DD'))}</td>
            <td>{<StarRating film={props.film} changeRating={props.changeRating}/>}</td>
            <td><Button variant='primary' className='button-del-edit' onClick={()=>{navigate(`/edit/${props.film.ID}`)}}>{<PencilSquare/>}</Button></td>
            <td><Button variant='warning' onClick={()=>{props.handleDelete(props.film.ID)}}>{<Trash/>}</Button></td>
    </>)
}

function DisplayFav(props){
    //console.log("Display Favorite " + props.film.isFavorite)
    if(props.film.isFavorite){
        return (<>
            <Form.Group controlId="formBasicCheckBox">
                <Form.Check type="checkbox" defaultChecked onClick={()=>{props.handleChangePreference(props.film)}}/>
            </Form.Group>
        </>
    )}
    else{
        return (<>
            <Form.Group controlId="formBasicCheckBox">
                <Form.Check type="checkbox" onClick={()=>{props.handleChangePreference(props.film)}}/>
            </Form.Group>
        </>
        
    )}
}  
export { FilmTable};