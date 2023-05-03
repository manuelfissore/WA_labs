import { Form }from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Filters() {
    const navigate = useNavigate();
    return (<>          
        <Form.Check type="radio" id='All' name='group1' defaultChecked label='All' onChange={()=>{navigate("/")}}/>
        <Form.Check  type="radio" id='Fav' name='group1'  label='Favorite'  onChange={()=>{navigate("/filter/favorite")}}/>
        <Form.Check  type="radio" id='BR' name='group1' label='Best Rated' onChange={()=>{navigate("/filter/bestRated")}}/>
        <Form.Check  type="radio" id='RecentSeen' name='group1'  label='Seen Last Month'  onChange={()=>{navigate("/filter/recentlySeen")}}/>
        <Form.Check  type="radio" id='Unseen' name='group1' label='Unseen'  onChange={()=>{navigate("/filter/unseen")}}/>
    </>
    )
}

export {Filters}