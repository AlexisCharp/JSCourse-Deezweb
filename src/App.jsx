import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home.jsx";
import Favorites from "./components/Favorites.jsx";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

function App() {
  return (<Router>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand mb-0 h1">
          <img src={logo} alt="React Logo" width="42"/>
          Deezweb
        </span>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <Link to="/deezweb/" className="nav-link">
              <i className="fas fa-search mx-1"/>
              Rechercher un titre
            </Link>
            <Link to="/deezweb/favorites" className="nav-link">
              <i className="fas fa-heartbeat mx-1"/>
              Mes favoris
            </Link>
          </ul>
        </div>
      </div>
    </nav>

    <Route path="/deezweb/" component={Home} exact="exact"/>
    <Route path="/deezweb/favorites" component={Favorites}/>
  </Router>);
}

export default App;
