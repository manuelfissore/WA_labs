/* eslint-disable react/prop-types */
import {useState} from "react";
import './StarRating.css'
import {Star} from "react-bootstrap-icons";

function StarRating(props){
    const [rating, setRating] = useState(props.film.Rating);
    const [hover, setHover] = useState(0);

    return (
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= (hover || props.film.Rating) ? "on" : "off"}
                onClick={() => {setRating(index); props.changeRating(props.film.id, index)}}
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