import { Link } from "react-router-dom";
import image from "../images/back.png";

export default function BackButton(props) {

  return <div>
    <Link to={props.Path}>
        <img src={image} alt="" style={{height: "100px", marginLeft: "40px"}}/>
    </Link>
  </div>;
}
