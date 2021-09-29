import { Link } from 'react-router-dom'
import './Category.scss'

export default function Category(props) {

    const url = 'https://image.tmdb.org/t/p/w1280/'
    console.log(props)
    return (
        <div className="Category">
            <h2 className="title">{props.category.toUpperCase()}</h2>
            <div className="movieBlock">
                {props.items.filter(movie => !!movie.title).map(movie => (
                    <Link to={`/${props.category}/${movie.type}/${movie.id}`}>
                        <div className="item" style={{ backgroundImage: `url(${url}${movie.backdrop})` }}>
                            <div className="basicInfo">
                                <h3>{movie.title}</h3>
                                <div className="movieRanking">
                                    <p>{movie.vote_average}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}