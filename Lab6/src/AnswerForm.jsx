import dayjs from 'dayjs';
import { useState } from 'react'
import {React} from 'react'
import { Badge, Button, Col, Form, Row, Table, Container, Navbar, FormCheck } from 'react-bootstrap';


function EditOrNewFilm(props) {
    const [name, setName] = useState((props.addNewOrEdit=='edit')?props.film.Title:'');
    const [favorite, setFavorite] = useState((props.addNewOrEdit=='edit')?props.film.isFavorite:false);
    const [rating, setRating] = useState((props.addNewOrEdit=='edit')?props.film.Rating:0);
    const [date, setDate] = useState((props.addNewOrEdit=='edit')?props.film.Date:dayjs().format('YYYY-MM-DD'));

    function handleAdd(){
        props.changeAddEditMode('false')
        props.handleAdd(name, favorite, date, rating);
    }

    function handleSave(){
        props.changeAddEditMode('false')
        props.handleSave(name, favorite, date, rating);
    }

    return <table>
        <tbody>
            <tr>
                <td><Form.Group controlId="FilmName">
                        <Form.Label className='fw-light'>Film Name</Form.Label>
                        <Form.Control type="text" onChange={(ev)=>{setName(ev.target.value)}} name="text" placeholder="Enter Film Name" />
                    </Form.Group></td>

                <td><Form.Group controlId="Insert watch date">
                    <Form.Label className='fw-light'>Enter watch date</Form.Label>
                    <Form.Control type="date" onChange={(ev)=>{setDate(ev.target.value)}} name="date"/>
                </Form.Group></td>

                <td><Form.Group controlId="Rating">
                    <Form.Label className='fw-light'>Rating</Form.Label>
                    <Form.Control type="number" min="0" max="5"  onChange={(ev)=>{setRating(ev.target.value)}} name="rating" placeholder="0" />
                </Form.Group></td>

                <td><Form.Group controlId="isFavorite">
                    <td>
                    <Form.Check type="checkbox"  onChange={(ev)=>{setFavorite(ev.target.value)}} name="fav"/>
                    </td>
                    <td>
                    <Form.Label className='fw-light'>is favorite?</Form.Label>
                     </td>
                </Form.Group></td>
                
                <td><Form.Group controlId="addButton">
                    <Form.Label className='fw-light'>&nbsp;</Form.Label><br />
                    {console.log(props.addNewOrEdit)}
                    {props.addNewOrEdit=='add' && <Button variant='success' id="addbutton" onClick={handleAdd}>ADD</Button>}
                    {props.addNewOrEdit=='edit' && <Button variant='success' id="addbutton" onClick={handleSave}>SAVE</Button>}
                    {' '}<Button variant='secondary' id="addbutton" onClick={props.handleCancel}>CANCEL</Button>
                </Form.Group>
                </td>
            </tr>
        </tbody>
    </table>
}

export {EditOrNewFilm}
