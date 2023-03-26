import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import RemoveFavourites from "./components/RemoveFavourites";
import AddFavourite from "./components/AddFavourite";

const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const api_key = import.meta.env.VITE_APP_API_KEY;

	useEffect(() => {
		setLoading(true);
		setError(null);

		fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=${api_key}`)
			.then((resp) => resp)
			.then((resp) => resp.json())
			.then((response) => {
				if (response.Response === "False") {
					setError(response.Error);
				} else {
					setMovies(response.Search);
				}

				setLoading(false);
			})
			.catch(({ message }) => {
				setError(message);
				setLoading(false);
			});
	}, [searchValue]);

	// const getMovieRequest = async (searchValue) => {
	// 	const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${api_key}`;

	// 	const response = await fetch(url);
	// 	const responseJson = await response.json();

	// 	if (responseJson.Search) {
	// 		setMovies(responseJson.Search);
	// 	}
	// };

	// useEffect(() => {
	// 	getMovieRequest(searchValue);
	// }, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem("react-movie-app-favourites")
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className="container-fluid movie-app">
			<div className="row d-flex align-items-center mt-4 mb-4">
				<Header heading="■ Movies" />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className="row">
				<MovieList
					movies={movies}
					heading={'movies'}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourite}
				/>
			</div>
			<div className="row d-flex align-items-center mt-4 mb-4">
				<Header heading="★ Favourites" />
			</div>
			<div className="row">
				<MovieList
					movies={favourites}
					heading={'fabourites'}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFavourites}
				/>
			</div>
		</div>
	);
};

export default App;
