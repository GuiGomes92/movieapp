import { useEffect, useState } from 'react';
import React from "react";
import { Link } from 'react-router-dom'
import Nav from './Nav'
import './Movie.scss'
import './Categories.scss'

function Movie(props) {
    const [movie, setMovie] = useState({ movie: [] });
    const [category, setCategory] = useState('')
    const urlBackdrop = 'https://image.tmdb.org/t/p/original/'
    const urlPoster = 'https://image.tmdb.org/t/p/w500/'

    function handleClick(movieId, movieTitle) {
        const wishlist = [{ id: movieId, title: movieTitle }]
        if (localStorage.getItem('wishlist')) {
            let storage = JSON.parse(localStorage.getItem('wishlist'))
            if (!storage.includes(movieId)) {
                storage.push(movieId);
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
                `https://api.themoviedb.org/3/${props.match.params.type}/${props.match.params.id}?api_key=3b61a2c83661b6fe29a68066873a8989`
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
                <div className="posterContainer overlay">
                    <img src={`${urlPoster}${movie.movie.poster_path}`} />
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
            </div>
        </div>
    )
}

export default Movie;