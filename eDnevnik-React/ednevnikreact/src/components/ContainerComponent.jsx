import ocene from "../images/knjiga.jpg";
import profil from "../images/pers2.jpg";
import izmena from "../images/izmena.jpg";
import unos from "../images/unos.jpg";
import brisanje from "../images/brisanje.jpg";
import ucenik from "../images/ucenik.png";
import profesor from "../images/profesor.jpg";
import tip from "../images/tip.jpg";
import razred from "../images/razred.jpg";
import subject from "../images/subject.jpg";
import dok from "../images/dokumenti.jpg";

export default function ContainerComponent(props) {
    let im;
    if (props.Image == "ocene") {
      im = ocene;
    } else if (props.Image == "profil") {
      im = profil; //menjaaaj
    } else if (props.Image == "izmena") {
      im = izmena;
    } else if (props.Image == "unos") {
      im = unos;
    } else if (props.Image == "brisanje") {
      im = brisanje;
    } else if (props.Image == "ucenik") {
      im = ucenik;
    } else if (props.Image == "profesor") {
      im = profesor;
    } else if (props.Image == "tip") {
      im = tip;
    } else if (props.Image == "razred") {
      im = razred;
    } else if (props.Image == "subject") {
      im = subject;
    } else if (props.Image == "dok") {
      im = dok;
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
