import ocene from "../images/knjiga.jpg";
import profil from "../images/pers2.jpg";

export default function ContainerComponent(props) {
    let im;
    if(props.Image == "ocene"){
        im = ocene;
    }else if (props.Image == "profil"){
        im = profil;//menjaaaj
    }
      return (
        <div>
          <div className="container">
            <h2>{props.Text}</h2>
            <img src={im} alt="Trenutno nije moguce prikazati sliku" className="imageContainer"/>
          </div>
        </div>
      );
}
