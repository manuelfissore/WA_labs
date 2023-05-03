import {Container, Navbar} from 'react-bootstrap';
import { CameraReelsFill} from "react-bootstrap-icons";

function NameAndLogo() {
    return <>
    <Navbar sticky="top" variant='dark' bg="primary" expand="lg" className='mb-1'>
    <Container>
        
        <Navbar.Brand>
            <CameraReelsFill  color="White" size={40}/>
            <div className='.me-5'> <span >Film Library</span></div>
           
        </Navbar.Brand> 
    </Container>
  </Navbar>
  </>
}

export {NameAndLogo}