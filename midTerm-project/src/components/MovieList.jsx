import React from "react";
import { useState } from 'react';

const MovieList = (props) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const FavouriteComponent = props.favouriteComponent;

  const handleOpen = (movie) => {
    setSelectedMovie(movie);
    setIsOpen(true);
  };

  const handleClose = () => {
    setSelectedMovie(null);
    setIsOpen(false);
  };

  return (
    <>
      {props.movies.map((movie, index) => (
        <div key={movie.imdbID} className="image-container d-flex justify-content-start m-3">
          <img onClick={() => handleOpen(movie)} src={movie.Poster} alt="movie" />
          <div onClick={() => props.handleFavouritesClick(movie)} className="overlay d-flex align-items-center justify-content-center">
            <FavouriteComponent />
          </div>
        </div>
      ))}
      {isOpen && (
        <div className="modal show" tabIndex="-1" role="dialog" onClick={handleClose}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              {selectedMovie && (
                <img className="modal-img" src={selectedMovie.Poster} alt="画像" />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieList;