import dayjs from 'dayjs';
import { useState } from 'react'
import {React} from 'react'
import { Badge, Button, Col, Form, Row, Table, Container, Navbar, FormCheck } from 'react-bootstrap';



function EditOrNewFilm(props) {
    const [name, setName] = useState((props.addNewOrEdit=='edit')?props.film.Title:'');
    const [favorite, setFavorite] = useState((props.addNewOrEdit=='edit')?props.film.isFavorite:false);
    const [rating, setRating] = useState((props.addNewOrEdit=='edit')?props.film.Rating:0);
    const [date, setDate] = useState((props.addNewOrEdit=='edit')?props.film.Date:dayjs().format('YYYY-MM-DD'));
    const [error, setError] = useState(false);

    function handleAdd(){
        console.log(name)
        if(name==""||name==''||name==" "||name.lenght==0||name==null){
            setError(true)
        }
        else{
            setError(false)
            props.changeAddEditMode('false')
            props.handleAdd(name, favorite, date, rating);
        }
    }

    function handleSave(){
        if(name==""||name==''||name==" "||name.lenght==0||name==null){
            setError(true)
        }
        else{
            setError(false)
            props.changeAddEditMode('false')
            props.handleSave(props.film.ID, name, favorite, date, rating);
        }
    }

    function handleCancel(){
        props.changeAddEditMode('false')
    }

    return <Table>
        <tbody>
            <td>
            <Row>
                <Form.Group controlId="FilmName">
                        <Form.Label className='fw-light'>Film Name</Form.Label>
                        {props.addNewOrEdit=='add' && <Form.Control type="text" className={(error==false)?"":"form-square border border-danger"} onChange={(ev)=>{setName(ev.target.value)}} name="Title" placeholder="Enter Film Name" />}
                        {props.addNewOrEdit=='edit' && <Form.Control type="text" className={(error==false)?"":"form-square border border-danger"} onChange={(ev)=>{setName(ev.target.value)}} name="Title" value={name} />}
                    </Form.Group>
            </Row>
            <Row>
                <Col xs={8}>
                    <Form.Group controlId="Insert watch date">
                        <Form.Label className='fw-light'>Enter watch date</Form.Label>
                        {props.addNewOrEdit=='add' && <Form.Control type="date" onChange={(ev)=>{setDate(ev.target.value)}} name="date"/>}
                        {props.addNewOrEdit=='edit' && <Form.Control type="date" onChange={(ev)=>{setDate(ev.target.value)}} name="date" value={(date=='undefined')?'':date.format("YYYY-MM-DD")}/>} {/*placeholder={(date=='undefined')?'':String(date.format*(AAAA/MM/DD))}*/}
                    </Form.Group>
                </Col>
                <Col  xs={4}>
                    <Form.Group controlId="Rating">
                        <Form.Label className='fw-light'>Rating</Form.Label>
                        {props.addNewOrEdit=='add' && <Form.Control type="number" min="0" max="5"  onChange={(ev)=>{setRating(ev.target.value)}} name="rating" placeholder="0" />}
                        {props.addNewOrEdit=='edit' && <Form.Control type="number" min="0" max="5"  onChange={(ev)=>{setRating(ev.target.value)}} name="rating" value={rating} />}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Form.Group controlId="isFavorite">
                    <Col sm="4">
                    {props.addNewOrEdit=='add' && <Form.Check type="checkbox" onChange={(ev)=>{setFavorite(ev.target.value)}} label='Is one of your favorite?' name="fav"/>}
                    {props.addNewOrEdit=='edit' && (favorite==true || favorite=='on') && <Form.Check type="checkbox"  label='Is one of your favorite?' onChange={(ev)=>{setFavorite(ev.target.value)}} name="fav" checked></Form.Check>}
                    {props.addNewOrEdit=='edit' && !(favorite==true || favorite=='on') && <Form.Check type="checkbox" label='Is one of your favorite?' onChange={(ev)=>{setFavorite(ev.target.value)}}  name="fav"></Form.Check>}
                    </Col>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group controlId="addButton">
                    <Form.Label className='fw-light'>&nbsp;</Form.Label><br/>
                    {props.addNewOrEdit=='add' && <Button variant='success' id="addbutton" onClick={handleAdd}>ADD</Button>}
                    {props.addNewOrEdit=='edit' && <Button variant='success' id="addbutton" onClick={handleSave}>SAVE</Button>}
                    {' '}<Button variant='secondary' id="addbutton" onClick={handleCancel}>CANCEL</Button>
                </Form.Group>
            </Row>
            </td>
        </tbody>
    </Table>
}

export {EditOrNewFilm}
