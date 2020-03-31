import React, {useState} from "react";
import fetchJsonp from "fetch-jsonp";
import Track from "./Track.jsx";
import FavService from "../FavService.js";

function Home(props) {
  const [title, setTitle] = useState("");
  const [orderBy, setOrderBy] = useState("ARTIST_ASC");
  const [musics, setMusics] = useState([]);

  function onTitleChange(e) {
    setTitle(e.target.value);
  }

  function onOrderChange(e) {
    setOrderBy(e.target.value);
  }

  function onSearch(e) {
    e.preventDefault();
    const encodedTitle = encodeURIComponent(title); //Assure la compatibilité avec une saisie en GET

    fetchJsonp(`https://api.deezer.com/search?q=${encodedTitle}&order=${orderBy}&output=jsonp`).then(res => res.json()).then(data => data.data).then(musics => {
      setMusics(musics);
    });
  }

  function onFavorites(music) {
    FavService.toggleFavorite(music);
    setMusics([...musics]);
  }

  return (<main className="container mt-3">
    <h1>Recherche {title}</h1>
    <p>Recherchez un titre sur Deezer en utilisant le formulaire suivant :</p>
    <hr/>
    <form onSubmit={onSearch}>
      <div className="row">
        <label htmlFor="searchText" className="col-sm-2 col-form-label text-right">
          Titre&nbsp;:
        </label>
        <div className="col-sm-4">
          <input type="text" className="form-control" id="searchText" onChange={onTitleChange} placeholder="Cactus de sibérie, Beat It..."/>
        </div>
        <label htmlFor="searchText" className="col-sm-2 col-form-label text-right">
          Trier par :
        </label>
        <div className="col-sm-2">
          <select id="order" onChange={onOrderChange} className="custom-select">
            <option value="ALBUM_ASC">Album</option>
            <option value="ARTIST_ASC">Artiste</option>
            <option value="TRACK_ASC">Musique</option>
            <option value="RANKING">Les plus populaires</option>
            <option value="RATING_ASC">Les mieux notés</option>
          </select>
        </div>
        <div className="col-sm-2 text-right">
          <input type="submit" className="btn btn-primary" value="Go"/>
        </div>
      </div>
    </form>
    <hr/> {/* <h3>Aucun résultat pour cette recherche ...</h3> */}
    <h2>Résultats</h2>
    <div className="card-group search-results">
      {
        musics.map(music => {
          return <Track key={music.id} music={music} onClick={onFavorites} isFavorite={FavService.isFavorite(music)} />;
        })
      }
    </div>
  </main>);
}

export default Home;