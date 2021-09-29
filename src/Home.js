import { useEffect, useState } from 'react';
import Nav from './Nav'
import './Home.scss';
import Container from './Container'
const REACT_APP_TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY


function Home() {
    const [popular, setPopular] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);

    async function fetchData(type, handler) {
        let movies = []
        const movieFetch = await fetch(
            `https://api.themoviedb.org/3/movie/${type}?api_key=${REACT_APP_TMDB_API_KEY}&page=1`
        );
        const movieFetchResponse = await movieFetch.json()
        movieFetchResponse?.results?.forEach(movie => {
            let name = movie.name || movie.original_name || movie.title
            movies.push({
                id: movie.id,
                title: name,
                overview: movie.overview,
                vote_average: movie.vote_average,
                date: movie.first_air_date,
                poster: movie.poster_path,
                backdrop: movie.backdrop_path,
                type: "movie"
            });
        })

        handler(movies)
    }

    useEffect(() => {
        fetchData('popular', setPopular);
        fetchData('upcoming', setUpcoming);
        fetchData('top_rated', setTopRated)
    }, [])

    return (
        <div className="Home">
            <Nav />
            <div className="Header">
                <h1>Mytheresa Movie Night</h1>
                <p>We're having a movie night for our employees. Pick a movie from the categories below and add it to your wishlist. The most voted will be the chosen.</p>
            </div>
            <Container popular={popular} upcoming={upcoming} topRated={topRated} />
        </div>
    );
}

export default Home;
