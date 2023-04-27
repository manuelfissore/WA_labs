import dayjs from 'dayjs';
import { useState } from 'react'
import {React} from 'react'
import { Badge, Button, Col, Form, Row, Table, Container, Navbar, FormCheck } from 'react-bootstrap';


function NewFilmForm(props) {
    const [name, setName] = useState('');
    const [favorite, setFavorite] = useState(false);
    const [rating, setRating] = useState(0);
    const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));

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
                    <Button variant='success' id="addbutton" onClick={() => {props.changeAddMode('false'); props.handleAdd(name, favorite, date, rating)}}>ADD</Button>
                </Form.Group>
                </td>
            </tr>
        </tbody>
    </table>
}
export {NewFilmForm}
