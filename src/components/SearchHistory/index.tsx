import React from 'react';
import { useDispatch } from 'react-redux';
import { ICityList, selectCity, setName } from '../../action';
import './styles.css';
interface IProps {
    recentSelectedCities: ICityList[]
}
const SearchHistory = ({ recentSelectedCities }:IProps) => {
    const dispatch = useDispatch();
    let filterCities = recentSelectedCities.slice(0, 5);
    return (
        <section className='search-history d-flex align-items-center'>
            {filterCities.length > 0 && <span className="bold">Search History:</span>}
            {filterCities.length > 0 && filterCities.map((item, i) =>
                <div key = {i} className="weather-card" onClick={(e) => {
                    dispatch(selectCity(item)); 
                    dispatch(setName(item.name + ', ' + item.state + ', ' + item.country))
                }}>
                    <div>{item.name}</div>
                </div>
            )}
        </section>
    )
}

export default SearchHistory;