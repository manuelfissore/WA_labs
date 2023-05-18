/* eslint-disable react/prop-types */
import { Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Filters(props) {
    const navigate = useNavigate();
    /*
    return (<>          
        <Form.Check type="radio" id='All' name='group1' defaultChecked label='All' onChange={()=>{navigate("/")}}/>
        <Form.Check  type="radio" id='Fav' name='group1'  label='Favorite'  onChange={()=>{navigate("/filter/favorite")}}/>
        <Form.Check  type="radio" id='BR' name='group1' label='Best Rated' onChange={()=>{navigate("/filter/bestRated")}}/>
        <Form.Check  type="radio" id='RecentSeen' name='group1'  label='Seen Last Month'  onChange={()=>{navigate("/filter/recentlySeen")}}/>
        <Form.Check  type="radio" id='Unseen' name='group1' label='Unseen'  onChange={()=>{navigate("/filter/unseen")}}/>
    </>
    )*/
    //console.log(props.filter)
    return (<>   
         <div>
            <Button id='All'  name='group1' label='All'  className={(props.filter===undefined||props.filter==="")?"btn btn-info":"btn btn-light"} onClick={()=>{navigate("/filter/filterAll")}}>All</Button>
            <Button id='Fav' name='group1'  label='Favorite'  className={(props.filter==='favorite')?"btn btn-info":"btn btn-light"}  onClick={()=>{navigate("/filter/favorite")}}>Favorite</Button>
            <Button id='BR' name='group1' label='Best Rated' className={(props.filter==='bestRated')?"btn btn-info":"btn btn-light"} onClick={()=>{navigate("/filter/bestRated")}}>Best Rated</Button>
            <Button id='RecentSeen' name='group1'  label='Seen Last Month'  className={(props.filter==='recentlySeen')?"btn btn-info":"btn btn-light"}  onClick={()=>{navigate("/filter/recentlySeen")}}>Seen Last Month</Button>
            <Button id='Unseen' name='group1' label='Unseen'   className={(props.filter==='unseen')?"btn btn-info":"btn btn-light"} onClick={()=>{navigate("/filter/unseen")}}>Unseen</Button>
        </div>
    </>
    )
}

export {Filters}