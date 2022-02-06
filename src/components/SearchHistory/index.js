import { useDispatch } from 'react-redux';
import './styles.css';
const SearchHistory = ({ recentSelectedCities }) => {
    const dispatch = useDispatch();
    if(recentSelectedCities.length >= 5) {
        recentSelectedCities.splice(0, 5);
    }
    return (
        <section className='search-history'>
            {recentSelectedCities.length > 0 && <h4>Search History</h4>}
            {recentSelectedCities.length > 0 && recentSelectedCities.map((item, i) =>
                <div className="weather-card" onClick={(e) => dispatch({type: 'weather/selectCity', payload: item})}>
                    <div>{item.name}</div>
                </div>
            )}
        </section>
    )
}
export default SearchHistory;