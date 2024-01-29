import './home.css';
import pbgImage  from './images/pbg.jpg';

function Home() {
    
  return (
    <div className="homeLogin">
      <h1>Prva beogradska gimnazija</h1>
      <img src={pbgImage} alt="Trenutno nije moguce prikazati sliku"></img>
      <h2>Dobrodosli u eDnevnik</h2>
      <div className="buttons">
        <button id="button1" >
          Ucenik
        </button>
        <button id="button2" >
          Roditelj
        </button>
        <button id="button3">
          Profesor
        </button>
        <button id="button4">
          Admin
        </button>
      </div>
    </div>
  );
}

export default Home;
