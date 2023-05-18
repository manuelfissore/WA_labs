/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
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
import {listFilteredFilm } from '../API';


function FilmTable(props) {
    const {filterName} =  useParams();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // load the list of questions from the API server
        console.log(filterName);
        if(filterName!=undefined)
            listFilteredFilm(filterName).then((list) => {
                props.setFilms(list);
                setLoading(false) ;
            })
      }, [filterName]);

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
                {props.films.map(f => <FilmRow  key={f.ID} film={f} handleDelete={props.handleDelete} handleChangePreference={props.handleChangePreference} changeRating={props.changeRating}/>)}
            </tbody>
        </Table>
        <AddFilm/>
    </>
}


function FilmRow(props){
    const navigate = useNavigate();
    //console.log("date of film"+props.film.ID+"->"+props.film.Date);
    return (<>
        <tr>
            <td>{props.film.Title}</td>
            <td><DisplayFav film={props.film} handleChangePreference={props.handleChangePreference}/> </td>
            <td>{((props.film.Date=='Invalid Date')||(props.film.Date=='undefined')||(props.film.Date===undefined)||isNaN(props.film.Date))?' ':(dayjs(props.film.Date).format('YYYY/MM/DD'))}</td>
            <td>{<StarRating film={props.film} changeRating={props.changeRating}/>}</td>
            <td><Button variant='primary' className='button-del-edit' onClick={()=>{navigate(`/edit/${props.film.ID}`)}}>{<PencilSquare/>}</Button></td>
            <td><Button variant='warning' onClick={()=>{props.handleDelete(props.film.ID)}}>{<Trash/>}</Button></td>
        </tr>
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