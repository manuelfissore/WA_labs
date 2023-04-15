import { Badge, Button, Col, Form, Row, Table } from "react-bootstrap";

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
                {props.films.map(f => <FilmRow key={f.id} film={f} deleteFilm={props.deleteFilm} />)}
            </tbody>
        </Table>
    </>
}

function FilmRow(props) {
    return <tr>
        <td>{props.film.Title}</td>
        <td>{props.film.isFavorite}</td>
        <td>{props.film.date.format('DD/MM/YYYY')}</td>
        <td>{props.film.rating}</td>
        <td><Button variant='warning' onClick={()=>{props.deleteFilm(props.film.id)}}>DELETE</Button></td>
    </tr>
}

export { FilmLibrary };