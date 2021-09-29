import Category from './Category'
import './Container.scss'

export default function Container(props) {
    return (
        <div className="Container">
            <Category items={props.popular} category={"popular"} />
            <Category items={props.upcoming} category={"upcoming"} />
            <Category items={props.topRated} category={"top rated"} />
        </div>
    )
}