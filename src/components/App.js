//import './App.css';
//import MainPage from "./views/MainPage/MainPage.js";
import { Route } from "react-router-dom";
import MainPage from "./views/MainPage";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={MainPage} />
    </div>
  );
}

export default App;
