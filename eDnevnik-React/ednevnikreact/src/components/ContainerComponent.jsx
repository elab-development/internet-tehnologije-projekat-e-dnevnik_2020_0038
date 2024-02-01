import ocene from "../images/knjiga.jpg";
import profil from "../images/pers2.jpg";
import izmena from "../images/izmena.jpg";
import unos from "../images/unos.jpg";
import brisanje from "../images/brisanje.jpg";

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
