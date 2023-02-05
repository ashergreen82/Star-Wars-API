import './App.css';
import Main from './Main';
import background from "./images/background.jpg";

function App() {
  return (
    <>
      <div style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh" }} >
        <div className="container">
          <Main />
        </div>
      </div>
    </>
  );
}

export default App;
