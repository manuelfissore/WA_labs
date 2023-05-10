
import { Button }from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function AddFilm(){
    const navigate=useNavigate();
   
    return (<><Button variant="primary" onClick={()=> navigate('/addFilm')}> Add a new film</Button> </>);

}

export {AddFilm}