import {React} from 'react'
import { MDBRadio } from 'mdb-react-ui-kit';


function Filters(props) {
    return (<>          
        <MDBRadio type="radio" id='All' name='group1' defaultChecked label='All' onChange={()=>{props.activeState('filter_all')}}/>
        <MDBRadio type="radio" id='Fav' name='group1'  label='Favorite' onChange={()=>{props.activeState('filter_favorite')}}/>
        <MDBRadio type="radio" id='BR' name='group1' label='Best Rated'onChange={()=>{props.activeState('filter_bestRated')}}/>
        <MDBRadio type="radio" id='RecentSeen' name='group1'  label='Seen Last Month' onChange={()=>{props.activeState('filter_recentlySeen')}}/>
        <MDBRadio type="radio" id='Unseen' name='group1' label='Unseen' onChange={()=>{props.activeState('filter_unseen')}}/>
    </>
    )
}
