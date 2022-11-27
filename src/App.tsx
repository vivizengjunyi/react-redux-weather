import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import currentWeather from "./fetch/currentWeather";
import geography from "./fetch/geography";
import weather from "./fetch/weather";
import CurrentWeather from "../src/components/CurrentWeather";
import SearchHistory from "../src/components/SearchHistory";
import { setCity, getCities } from "./localstorage";
import "./styles.css";
import { useEffect } from "react";
import { useRef } from "react";
import { RootState, AppDispatch } from "./reducer/store";
import {
  ICityList,
  IForeCastWeather,
  IForeCastWeatherDaily,
  IWeather,
  chooseCity as chooseCityAction,
} from "./action";

function App() {
  const name = useSelector<RootState, string>(
    (state) => state.weatherReducer.name
  );
  const cityList = useSelector<RootState, ICityList[]>(
    (state) => state.weatherReducer.cityList
  );
  const selectedCity = useSelector<RootState, ICityList>(
    (state) => state.weatherReducer.selectedCity
  );
  const forecastWeather = useSelector<RootState, IForeCastWeather>(
    (state) => state.weatherReducer.forecastWeather
  );
  const currentWeatherInfo = useSelector<RootState, IWeather>(
    (state) => state.weatherReducer.currentWeatherInfo
  );
  const dispatch = useDispatch<AppDispatch>();
  const [backgroundColorChange, setBackgroundColorChange] =
    useState<string>("");

  useEffect(() => {
    if (selectedCity) {
      setCity(selectedCity);
      dispatch(weather(selectedCity));
      dispatch(currentWeather(selectedCity));
    }
  }, [selectedCity]);

  useEffect(() => {
    if (currentWeatherInfo) {
      handleBackgroundColorChange(currentWeatherInfo);
    }
  }, [currentWeatherInfo]);

  const recentSelectedCities = getCities();

  const timerRef = useRef<any>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({
      type: "weather/setName",
      payload: value,
    });
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => dispatch(geography(value)), 500);
  };

  const filterCityList = (cityList: ICityList[]): ICityList[] => {
    const cityMap: { [lonlat: string]: ICityList } = {};
    cityList.forEach((item) => {
      const lonlat = item.lon + "-" + item.lat;
      if (!cityMap[lonlat]) cityMap[lonlat] = item;
    });
    return Object.values(cityMap);
  };
  const filterredCityList = filterCityList(cityList);

  const chooseCity = (e: React.MouseEvent<HTMLElement>, item: ICityList) => {
    let el = e.target as HTMLElement | null;
    while (el && el.tagName.toLowerCase() !== "div") {
      el = el.parentNode as HTMLElement | null;
    }
    const dataValue = el && el.getAttribute("data-value");
    dispatch(chooseCityAction(item, dataValue || ""));
  };
  const handleBackgroundColorChange = (val: IWeather) => {
    const type = val.weather[0].main.toLowerCase();
    switch (type) {
      case "clouds":
      case "clear":
      case "rain":
      case "snow":
      case "fog":
        setBackgroundColorChange(type);
        break;
      default:
        return;
    }
  };

  const timeConverterDay = (val: IForeCastWeatherDaily, val2: string) => {
    let unix_timestamp = val.dt;
    let a: Date = new Date(unix_timestamp * 1000);
    let day = a.toLocaleDateString("en-US", {
      timeZone: val2,
      weekday: "long",
    });
    return day;
  };

  const timeConverterDate = (val: IForeCastWeatherDaily, val2: string) => {
    let unix_timestamp = val.dt;
    let a: Date = new Date(unix_timestamp * 1000);
    let date = a.toLocaleDateString("en-US", {
      timeZone: val2
    });
    return (date = date.substring(0, date.length - 5));
  };

  const weatherForecastFilter:IForeCastWeatherDaily[] = forecastWeather && forecastWeather.daily.slice(1, 8) || [];

  return (
    <div className={backgroundColorChange}>
      <div className="wrapper">
        <div className="wrapper-bg">
          <div className="project-language"><h1>React, Redux &amp; TypeScript Project</h1></div>
          <h3>Weather Forecast</h3>
          <div>
            <input
              placeholder="Search city"
              type="text"
              className="my-3 form-control input-width"
              value={name}
              onChange={handleChange}
              id="inputValue"
            />
            {filterredCityList.length > 0 && (
              <div className="city-list-wrapper">
                {filterredCityList.map((item) => (
                  <div
                    className="city-list"
                    data-value={
                      item.name + ", " + item.state + ", " + item.country
                    }
                    onClick={(e) => chooseCity(e, item)}
                  >
                    {item.name}, {item.state}, {item.country}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {weatherForecastFilter.length !== 0 && (
          <div className="weather-wrapper">
            <CurrentWeather />
            <section className="forecast">
              <div><span className='title'>Weather Forecast</span></div>
              <table className="forecast-weather">
                <tr>
                  <th colSpan={2}>Date</th>
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
                {weatherForecastFilter.map((item, i) => (
                  <tr>
                    <td colSpan={2}>
                      <div>
                        {timeConverterDay(item, forecastWeather.timezone)}
                      </div>
                      <div className="">
                        {timeConverterDate(item, forecastWeather.timezone)}
                      </div>
                    </td>
                    <td>
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt={item.weather[0].main}
                      />
                    </td>
                    <td>{item.weather[0].description}</td>
                    <td>{Math.round(item.temp.morn)}&deg;C</td>
                    <td>{Math.round(item.temp.day)}&deg;C</td>
                    <td>{Math.round(item.temp.night)}&deg;C</td>
                    <td>{item.humidity}%</td>
                    <td>{Math.round(item.temp.min)}&deg;C</td>
                    <td>{Math.round(item.temp.max)}&deg;C</td>
                    <td>
                      {Math.round((item.temp.max - item.temp.min) / 2)}&deg;C
                    </td>
                  </tr>
                ))}
              </table>
            </section>
          </div>
        )}
        <SearchHistory recentSelectedCities={recentSelectedCities} />
      </div>
    </div>
  );
}

export default App;
