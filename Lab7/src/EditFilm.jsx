
import { useParams } from "react-router-dom";

function Edit () {
    const {filmID } = useParams();
    return (<>     
        <span>film to edit {filmID}</span>
    </>)
}

export {Edit}