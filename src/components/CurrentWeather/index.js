import { React } from 'react';
import { useSelector } from 'react-redux';
import './styles.css';

const WeatherCurrent = () => {
    const currentWeatherInfo = useSelector(state => state.weatherReducer.currentWeatherInfo);
    const forecastWeather = useSelector(state => state.weatherReducer.forecastWeather);

    function monthAndDay(val1,val2) {
        let unix_timestamp = val1;
        let a = new Date(unix_timestamp * 1000);
        let weekday = a.toLocaleDateString('en-US', { timeZone: val2, weekday:'long' });
        let month = a.toLocaleDateString('en-US', { timeZone: val2, month:'long' });
        let day = a.toLocaleDateString('en-US', { timeZone: val2, day:'2-digit' });
        return weekday + " " + month + ' ' + day;
    }

    function hourAndMinute(val1, val2) {
        let unix_timestamp = val1;
        let a = new Date(unix_timestamp * 1000);
        let time = a.toLocaleTimeString('en-US', { timeZone: val2, timeStyle: 'short', hourCycle: 'h11' });
        return time;
    }


    return currentWeatherInfo ? (
        <section className='current-weather'>
            <h2>Current Weather</h2>
            <div className='city-name'>
                {currentWeatherInfo.name}
            </div>
            <div className='row'>
                <div className='column'>
                    <div className='city-date'>{monthAndDay(currentWeatherInfo.dt, forecastWeather.timezone)}</div>
                    <div className='city-time'>{hourAndMinute(currentWeatherInfo.dt, forecastWeather.timezone)}</div>
                </div>
                <img src={`https://openweathermap.org/img/wn/${currentWeatherInfo.weather[0].icon}@2x.png`} alt={currentWeatherInfo.weather.main} className='weather-icon' />
                <div className='current-temp'>
                    {Math.round(currentWeatherInfo.main.temp - 273.15)}
                    <sup>&deg;C</sup>
                </div>
                <div className='column'>
                    <div>Humidity {currentWeatherInfo.main.humidity}%</div>
                    <div className='min'>Min {Math.round(currentWeatherInfo.main.temp_min - 273.15)}
                        &deg;C</div>
                    <div className='max'>Max {Math.round(currentWeatherInfo.main.temp_max - 273.15)}
                        &deg;C</div>
                </div>
            </div>
        </section>
    ) : ''
}

export default WeatherCurrent;