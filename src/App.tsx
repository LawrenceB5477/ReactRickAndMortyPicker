import React, { ReactElement, useContext, useState, FormEvent } from "react";
import { Store, IEpisode } from "./Store";
import "./App.css";
import EpisodeList from "./EpisodeList";
import { Router, Link } from "@reach/router";
import FavoriteList from "./FavoriteList";

const App: React.FC = (): ReactElement => {
  return (
    <div className="main">
      <nav className="header">
        <div className="title">
          <h1>Rick and Morty!</h1>
          <p>Choose your favorite episode!</p>
        </div>
        <div className="navigate">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </div>
      </nav>
      <Router>
        <EpisodeList path="/" />
        <FavoriteList path="/favorites" />
      </Router>
    </div>
  );
};

export default App;
