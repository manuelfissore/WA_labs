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
        props.handleSave(props.film.ID, name, favorite, date, rating);
    }
    function handleCancel(){
        props.changeAddEditMode('false')
    }

    return <table>
        <tbody>
            <tr>
                <td><Form.Group controlId="FilmName">
                        <Form.Label className='fw-light'>Film Name</Form.Label>
                        {props.addNewOrEdit=='add' && <Form.Control type="text" onChange={(ev)=>{setName(ev.target.value)}} name="text" placeholder="Enter Film Name" />}
                        {props.addNewOrEdit=='edit' && <Form.Control type="text" onChange={(ev)=>{setName(ev.target.value)}} name="text" placeholder={props.film.Title} />}
                    </Form.Group></td>

                <td><Form.Group controlId="Insert watch date">
                    <Form.Label className='fw-light'>Enter watch date</Form.Label>
                    {props.addNewOrEdit=='add' && <Form.Control type="date" onChange={(ev)=>{setDate(ev.target.value)}} name="date"/>}
                    {props.addNewOrEdit=='edit' && <Form.Control type="date" onChange={(ev)=>{setDate(ev.target.value)}} name="date" value={(props.film.Date=='undefined')?'':props.film.Date.format("YYYY-MM-DD")}/>} {/*placeholder={(date=='undefined')?'':String(date.format*(AAAA/MM/DD))}*/}

                </Form.Group></td>

                <td><Form.Group controlId="Rating">
                    <Form.Label className='fw-light'>Rating</Form.Label>
                    {props.addNewOrEdit=='add' && <Form.Control type="number" min="0" max="5"  onChange={(ev)=>{setRating(ev.target.value)}} name="rating" placeholder="0" />}
                    {props.addNewOrEdit=='edit' && <Form.Control type="number" min="0" max="5"  onChange={(ev)=>{setRating(ev.target.value)}} name="rating" placeholder={props.film.Rating} />}
                </Form.Group></td>

                <td><Form.Group controlId="isFavorite">
                    <td>
                    {props.addNewOrEdit=='add' && <Form.Check type="checkbox"  onChange={(ev)=>{setFavorite(ev.target.value)}} name="fav"/>}
                    {props.addNewOrEdit=='edit' && (props.film.isFavorite==true || props.film.isFavorite=='on') && <Form.Check type="checkbox"  onChange={(ev)=>{setFavorite(ev.target.value)}} name="fav" checked />}
                    {props.addNewOrEdit=='edit' && !(props.film.isFavorite==true || props.film.isFavorite=='on') && <Form.Check type="checkbox"  onChange={(ev)=>{setFavorite(ev.target.value)}} name="fav"/>}
                    </td>
                    <td>
                    <Form.Label className='fw-light'>is favorite?</Form.Label>
                     </td>
                </Form.Group></td>
                
                <td><Form.Group controlId="addButton">
                    <Form.Label className='fw-light'>&nbsp;</Form.Label><br />
                    {props.addNewOrEdit=='add' && <Button variant='success' id="addbutton" onClick={handleAdd}>ADD</Button>}
                    {props.addNewOrEdit=='edit' && <Button variant='success' id="addbutton" onClick={handleSave}>SAVE</Button>}
                    {' '}<Button variant='secondary' id="addbutton" onClick={handleCancel}>CANCEL</Button>
                </Form.Group>
                </td>
            </tr>
        </tbody>
    </table>
}

export {EditOrNewFilm}
