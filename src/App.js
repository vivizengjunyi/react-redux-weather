import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import currentWeather from './fetch/currentWeather';
import geography from './fetch/geography';
import weather from './fetch/weather';
import CurrentWeather from '../src/components/CurrentWeather';
import SearchHistory from '../src/components/SearchHistory';
import { setCity, getCities } from './localstorage';
import './styles.css';
import { useEffect } from 'react';
import { useRef } from 'react';

function App() {
  const name = useSelector(state => state.weatherReducer.name);
  const cityList = useSelector(state => state.weatherReducer.cityList);
  const selectedCity = useSelector(state => state.weatherReducer.selectedCity);
  const forecastWeather = useSelector(state => state.weatherReducer.forecastWeather);
  const currentWeatherInfo = useSelector(state => state.weatherReducer.currentWeatherInfo)
  const timerRef = useRef(null);
  const dispatch = useDispatch();
  const [showTwoMoreForecast, setshowTwoMoreForecast] = useState(false);
  const [backgroundColorChange, setBackgroundColorChange] = useState(null);

  useEffect(() => {
    if (selectedCity) {
      setCity(selectedCity);
      dispatch(weather(selectedCity))
      dispatch(currentWeather(selectedCity))
    }
  }, [selectedCity])
  useEffect(() => {
    if (currentWeatherInfo) {
      handleBackgroundColorChange(currentWeatherInfo)
    }
  }, [currentWeatherInfo])
  const recentSelectedCities = getCities();

  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value)
    dispatch({
      type: 'weather/setName',
      payload: value
    })

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => dispatch(geography(value)), 500)
  }

  const filterCityList = (cityList) => {
    let newCityListArray = [...cityList]
    for (let i = 0; i < cityList.length - 1; i++) {
      for (let j = 1; j < cityList.length; j++) {
        if (cityList[i].lon === cityList[j].lon && cityList[i].lat === cityList[j].lat) {
          newCityListArray.splice(j, 1)
        }
      }
    }
    return newCityListArray;
  }
  const filterredCityList = filterCityList(cityList);

  const chooseCity = (e, item) => {
    const el = e.target;
    while (!el && el.tagName.toLowerCase() !== 'div') {
      el = el.parentNode;
    }
    dispatch({
      type: 'weather/selectCity',
      payload: item
    })
    const dataValue = el.getAttribute('data-value');
    dispatch({
      type: 'weather/setName',
      payload: dataValue
    })
    dispatch({
      type: 'weather/fetchLocation',
      payload: []
    })
  }

  const handleBackgroundColorChange = (val) => {
    if (val.weather[0].main.toLowerCase() === 'clouds') { setBackgroundColorChange('clouds'); }
    if (val.weather[0].main.toLowerCase() === 'clear') { setBackgroundColorChange('clear'); }
    if (val.weather[0].main.toLowerCase() === 'rain') { setBackgroundColorChange('rain'); }
    if (val.weather[0].main.toLowerCase() === 'snow') { setBackgroundColorChange('snow'); }
    if (val.weather[0].main.toLowerCase() === 'fog') { setBackgroundColorChange('fog'); }
  }

  const timeConverter = (val) => {
    let unix_timestamp = val;
    let a = new Date(unix_timestamp * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let month = months[a.getMonth()];
    let date = a.getDate();
    let day = days[a.getDay()];
    return day + ' ' + month + ' ' + date;
  }

  const filterCityListFunction = (item) => {
    return forecastWeather.daily.indexOf(item) !== 0 && forecastWeather.daily.indexOf(item) <= 5;
  }

  const fiveForecast = (forecastWeather && forecastWeather.daily.filter(filterCityListFunction)) || [];

  const TwoMoreForecast = forecastWeather && forecastWeather.daily.filter(item => forecastWeather.daily.indexOf(item) > 5);

  const getTwoMoreForecast = (e) => {
    setshowTwoMoreForecast(true);
  }

  return (
    <div className={backgroundColorChange}>
      <div className={'wrapper'}>
        <h1>React &amp; Redux Project</h1>
        <h2>Weather Forecast</h2>
        <div className='input-wrapper'>
          <input type='text' value={name} onChange={handleChange} id='inputValue' placeholder="Search city" />
          {filterredCityList.length > 0 && 
            <div className='city-list-wrapper'>
          {filterredCityList.map(item => <div className='city-list' data-value={item.name + ', ' + item.state + ', ' + item.country} onClick={(e) => chooseCity(e, item)}>{item.name}, {item.state}, {item.country}</div>)}
          </div>
          }
        </div>
        {fiveForecast.length !== 0 &&
          <div className='weather-wrapper'>
            <CurrentWeather />
            <section className='forecast'>
              <table className='forecast-weather'>

                <caption>Weather Forecast</caption>
                <tr>
                  <th>Date</th>
                  <th>Weather</th>
                  <th>Description</th>
                  <th>Morning</th>
                  <th>Day</th>
                  <th>Night</th>
                  <th>Humidity</th>
                  <th>Min</th>
                  <th>Max</th>
                  <th>Mean</th>
                </tr>
                {fiveForecast.map((item, i) =>
                  <tr>
                    <td>{timeConverter(item.dt)}</td>
                    <td><img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].main} /></td>
                    <td>{item.weather[0].description}</td>
                    <td>{Math.round(item.temp.morn)}&deg;C</td>
                    <td>{Math.round(item.temp.day)}&deg;C</td>
                    <td>{Math.round(item.temp.night)}&deg;C</td>
                    <td>{item.humidity}%</td>
                    <td>{Math.round(item.temp.min)}&deg;C</td>
                    <td>{Math.round(item.temp.max)}&deg;C</td>
                    <td>{Math.round((item.temp.max - item.temp.min) / 2)}&deg;C</td>
                  </tr>
                )}
                {showTwoMoreForecast && TwoMoreForecast.map(item => <tr>
                  <td>{timeConverter(item.dt)}</td>
                  <td><img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].main} /></td>
                  <td>{item.weather[0].description}</td>
                  <td>{Math.round(item.temp.morn)}&deg;C</td>
                  <td>{Math.round(item.temp.day)}&deg;C</td>
                  <td>{Math.round(item.temp.night)}&deg;C</td>
                  <td>{item.humidity}%</td>
                  <td>{Math.round(item.temp.min)}&deg;C</td>
                  <td>{Math.round(item.temp.max)}&deg;C</td>
                  <td>{Math.round((item.temp.max - item.temp.min) / 2)}&deg;C</td>
                </tr>)
                }
              </table>
              {!showTwoMoreForecast ? <button onClick={(e) => getTwoMoreForecast()} className='click-button'>See 2 More days</button> : ''}
            </section>
          </div>
        }
        <SearchHistory recentSelectedCities={recentSelectedCities} />
      </div>
    </div>
  )
}

export default App;
