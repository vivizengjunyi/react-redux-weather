import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { IForeCastWeather, IWeather } from "../../action";
import { RootState } from '../../reducer/store';
import './styles.css';

const WeatherCurrent = () => {
    const currentWeatherInfo = useSelector<RootState, IWeather>(state => state.weatherReducer.currentWeatherInfo);
    const forecastWeather = useSelector<RootState, IForeCastWeather>(state => state.weatherReducer.forecastWeather);
    const [_monthAndDay, setMonthAndDay] = React.useState<string>('');
    const [_hourAndMinute, setHourAndMinute] = React.useState<string>('');

    function monthAndDay(val:string) {
        let a:Date = new Date();
        let weekday = a.toLocaleDateString('en-US', { timeZone: val, weekday:'long' });
        let month = a.toLocaleDateString('en-US', { timeZone: val, month:'long' });
        let day = a.toLocaleDateString('en-US', { timeZone: val, day:'2-digit' });
        setMonthAndDay( weekday + " " + month + " " + day);
    }

    function hourAndMinute(val:string) {
        let a:Date = new Date();
        let time = a.toLocaleTimeString('en-US', { timeZone: val, timeStyle: 'short', hourCycle: 'h12' });
        setHourAndMinute( time );
    }

    useEffect(() => {
        const interval = () => {
            monthAndDay(forecastWeather.timezone);
            hourAndMinute(forecastWeather.timezone);
        }
        const i = setInterval(interval, 1000);
        return () => {
            clearInterval(i);
        }
    }, [forecastWeather]);

    return currentWeatherInfo ? (
        <section className='current-weather'>
            <h2 className="city-name">{currentWeatherInfo.name}</h2>
            <div><span className='title'>Current Weather</span></div>
            <div className='row'>
                <div className='column'>
                    <div className='city-date'>{_monthAndDay}</div>
                    <div className='city-time'>{_hourAndMinute}</div>
                </div>
                <img src={`https://openweathermap.org/img/wn/${currentWeatherInfo.weather[0].icon}@2x.png`} alt={currentWeatherInfo.weather[0].main} className='weather-icon' />
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
    ) : null
}

export default WeatherCurrent;
