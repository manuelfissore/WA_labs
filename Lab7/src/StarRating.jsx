/* eslint-disable react/prop-types */
import {useState} from "react";
import './StarRating.css'
import {Star} from "react-bootstrap-icons";

function StarRating(props){
    const [rating, setRating] = useState(props.film.Rating);
    const [hover, setHover] = useState(0);
    const myStyle = {
      display: "inline-block", 
      backgroundColor: "transparent",
      padding: "0em 0em",
      border: "none",
      outline: "none",
      borderRadius: "1px",
      overflow: "hidden",
      cursor: "pointer",
    }
    return (
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                style={myStyle}
                key={index}
                className={index <= (hover || props.film.Rating) ? "on" : "off"}
                onClick={() => {setRating(index); props.changeRating(props.film.ID, index)}}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <Star/>
              </button>
            );
          })}
        </div>
      );
}

export {StarRating}