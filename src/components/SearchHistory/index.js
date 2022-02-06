import { useDispatch } from 'react-redux';
import './styles.css';
const SearchHistory = ({ recentSelectedCities }) => {
    const dispatch = useDispatch();
    let filterCities = [];
    filterCities = recentSelectedCities.slice(0, 5);
    return (
        <section className='search-history'>
            {filterCities.length > 0 && <h4>Search History</h4>}
            {filterCities.length > 0 && filterCities.map((item, i) =>
                <div className="weather-card" onClick={(e) => {dispatch({type: 'weather/selectCity', payload: item}); dispatch({type: 'weather/setName', payload: item.name + ', ' + item.state + ', ' + item.country})}}>
                    <div>{item.name}</div>
                </div>
            )}
        </section>
    )
}
export default SearchHistory;