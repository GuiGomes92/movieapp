import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Nav from './Nav'
import './Movie.scss'
import './Categories.scss'
const REACT_APP_TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY

function Movie(props) {
    const [movie, setMovie] = useState({ movie: [] });
    const [category, setCategory] = useState('')
    const urlBackdrop = 'https://image.tmdb.org/t/p/original/'
    const urlPoster = 'https://image.tmdb.org/t/p/w500/'

    function handleClick(movieId, movieTitle) {
        const wishlist = [{ id: movieId, title: movieTitle, category: category }]
        if (localStorage.getItem('wishlist')) {
            let storage = JSON.parse(localStorage.getItem('wishlist'))
            console.log(storage.find(element => element.id === movieId))
            if (!storage.find(element => element.id === movieId)) {
                storage.push(...wishlist);
                localStorage.setItem('wishlist', JSON.stringify(storage))
            }
        } else {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
    }

    useEffect(() => {
        setCategory(props.match.params.category)
        const fetchData = async () => {
            const result = await fetch(
                `https://api.themoviedb.org/3/${props.match.params.type}/${props.match.params.id}?api_key=${REACT_APP_TMDB_API_KEY}`
            );
            const item = await result.json()
            setMovie({ movie: item });
        }
        fetchData();
    }, [])
    return (
        <div>
            <Nav />
            <div className={`fullContainer ${category.replace(/\s/g, "_")}`}>
                <div className='backdrop' style={{ backgroundImage: `url(${urlBackdrop}${movie.movie.backdrop_path})` }}></div>
                <div className="mainPosterContainer overlay">
                    <div className="posterContainer">
                        <img src={`${urlPoster}${movie.movie.poster_path}`} alt={`Poster of movie: ${movie.movie.title}`} />
                        <div className="posterContainerInfo">
                            <div className="bttns">
                                <Link to={"/"}><button className='goBackBtn'>Go Back</button></Link>
                                <button className='wishlistBtn' onClick={() => handleClick(movie.movie.id, movie.movie.title)}>Add to Wishlist</button>
                            </div>
                            <h1>{movie.movie.title}</h1>
                            {movie.movie.tagline && <h2>{movie.movie.tagline}</h2>}
                            <p>{movie.movie.overview}</p>
                        </div>
                    </div>
                    <div className="tecnicalInfo">
                        <div className="tecnicalInfo-items">
                            {movie.movie.genres && movie.movie.genres.map((item, index) => <p key={index}>{item.name}</p>)}
                            <p>Release: {movie.movie.release_date}</p>
                            <p>{movie.movie.runtime} min</p>
                            <p>Votes: {movie.movie.vote_count}</p>
                            <p>Average: {movie.movie.vote_average}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movie;