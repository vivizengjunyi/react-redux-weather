import { React } from 'react';
import { useSelector } from 'react-redux';
import './styles.css';

const WeatherCurrent = () => {
    const currentWeatherInfo = useSelector(state => state.weatherReducer.currentWeatherInfo);

    function monthAndDay(val) {
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

    function hourAndMinute(val) {
        let unix_timestamp = val;
        let a = new Date(unix_timestamp * 1000);
        let hour = a.getHours();
        var min = a.getMinutes();
        return hour + ":" + min;
    }


    return currentWeatherInfo ? (
        <section className='current-weather'>
            <h2>Current Weather</h2>
            <div className='city-name'>
                {currentWeatherInfo.name}
            </div>
            <div className='row'>
                <div className='column'>
                    <div className='city-date'>{monthAndDay(currentWeatherInfo.dt)}</div>
                    <div className='city-time'>{hourAndMinute(currentWeatherInfo.dt)}</div>
                    {/* <div className='weather-name'>
                        {currentWeatherInfo.weather[0].main}
                    </div> */}
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