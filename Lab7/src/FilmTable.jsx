/* eslint-disable react/prop-types */
import { Button, Col, Form, Table} from 'react-bootstrap';
import { StarFill, Star, Trash, PencilSquare} from "react-bootstrap-icons";
import {Filters} from "./Filter"
import { useNavigate, useParams } from "react-router-dom";
import dayjs from 'dayjs';

function FilmTable(props) {
    const {filterName} = useParams();
    const navigate = useNavigate();

    console.log("Film table ->" + filterName);
   /* const handleAdd = (id) => {
        navigate(`/addFilm/${id}`);
    }
    */
    const handleEdit = (id) => {
        navigate(`/editFilm/${id}`);
    }
    const handleDelete = (id) => {
        props.deleteFilm(id);
    }
    
    if (props.films) {
        return (<>
                <Col><Filters/></Col>
            <Col>
                <FilmDetails films={props.films} activeFilter={filterName} handleEdit={handleEdit} handleDelete={handleDelete}/>
            </Col>
            {/*props.addNewOrEdit=='add' &&  <EditOrNewFilm addNewOrEdit={props.addNewOrEdit} changeAddEditMode={props.changeAddEditMode} handleAdd={props.handleAdd}/>*/}
            {/*props.addNewOrEdit=='edit' && <EditOrNewFilm key={filmToEdit.ID} film={(filmToEdit!=null)?filmToEdit:console.log('film non passato correttamente')} addNewOrEdit={props.addNewOrEdit} changeAddEditMode={props.changeAddEditMode} handleSave={props.handleSave}/>*/}
        </>)
    }
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
                     return {props.films.map(f => <FilmFiltered key={f.ID} film={f} activeFilter={props.activeFilter} handleEdit={props.handleEdit} handleDelete={props.handleDelete}/>)}
                </tbody>
            </Table>
        </>
    }


function FilmFiltered(props) {
    const date = dayjs();
    console.log("Film Filtered ->" + props.activeFilter);
    if(props.activeFilter==null || (props.activeFilter==='favorite' && props.film.isFavorite) ||(props.activeFilter==='bestRated' && props.film.Rating==5)||
    (props.activeFilter==='recentlySeen' && (date.diff(props.film.Date, 'month')<1)) || (props.activeFilter==='unseen' && props.film.Date==='undefined'))
        return (<><FilmRow film={props.film} handleDelete={props.handleDelete}/></>)
    
}


function FilmRow(props){
    return (<>
        <tr>
            <td>{props.film.Title}</td>
            <td><DisplayFav film={props.film}/> </td>
            <td>{(props.film.Date=='undefined')?'':(props.film.Date.format('YYYY/MM/DD'))}</td>
            <td>{<RatingStar film={props.film}/>}</td>
            <td><Button variant='primary' onClick={()=>{props.handleEdit(props.film.ID)}}>{<PencilSquare/>}</Button></td>
            <td><Button variant='warning' onClick={()=>{props.handleDelete(props.film.ID)}}>{<Trash/>}</Button></td>
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

/*
function AddFilm(props){
    handleAdd();
}
*/

export { FilmTable};