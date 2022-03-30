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

  const timerRef = useRef(null);
  const handleChange = (e) => {
    const value = e.target.value;
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
    const cityMap = {}
    cityList.forEach(item => {
      const LonLat = item.lon + '-' + item.lat;
      if(!cityMap[LonLat])
        cityMap[LonLat] = item;
    })
    return Object.values(cityMap)
  }
  const filterredCityList = filterCityList(cityList);

  const chooseCity = (e, item) => {
    let el = e.target;
    while (!el && el.tagName.toLowerCase() !== 'div') {
      el = el.parentNode;
    }
    const dataValue = el.getAttribute('data-value');
    dispatch({
      type: 'weather/chooseCity',
      payload: {
        name: dataValue,
        selectedCity: item
      }
    })
  }

  const handleBackgroundColorChange = (val) => {
    const type = val.weather[0].main.toLowerCase();
    switch (type) {
      case 'clouds':
      case 'clear':
      case 'rain':
      case 'snow':
      case 'fog':
        setBackgroundColorChange(type)
        break;
      default:
        return;
    }
  }

  const timeConverterDay = (val, val2) => {
    let unix_timestamp = val.dt;
    let a = new Date(unix_timestamp * 1000);
    let day = a.toLocaleDateString('en-US', { timeZone: val2, weekday: 'long' })
    return day;
  }

  const timeConverterDate = (val, val2) => {
    let unix_timestamp = val.dt;
    let a = new Date(unix_timestamp * 1000);
    let date = a.toLocaleDateString('en-US', { timeZone: val2, date: 'long' })
    return date = date.substring(0, date.length - 5);
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
                  <th colspan="2">Date</th>
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
                    <td colspan="2"><div>{timeConverterDay(item, forecastWeather.timezone)}</div><div className=''>{timeConverterDate(item, forecastWeather.timezone)}</div></td>
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
                  <td colspan="2"><div>{timeConverterDay(item, forecastWeather.timezone)}</div><div>{timeConverterDate(item, forecastWeather.timezone)}</div></td>
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
