import { PayloadAction } from "@reduxjs/toolkit";
import { ICityList, IForeCastWeather, IWeather } from "../action";

interface IWeatherState {
    name: string;
    cityList: ICityList[];
    selectedCity: ICityList | null;
    forecastWeather: IForeCastWeather | null;
    currentWeatherInfo: IWeather | null;
}
const defaultState:IWeatherState = {
    name: '',
    cityList: [],
    selectedCity: null,
    forecastWeather: null,
    currentWeatherInfo: null
}
const weatherReducer = (state:IWeatherState = defaultState, action : PayloadAction<any>) => {
    switch(action.type) {
        case 'weather/chooseCity':
            return {
                ...state,
                selectedCity: action.payload.selectedCity,
                name: action.payload.name,
                cityList : []
            }
        case 'weather/setName':
            return {
                ...state,
                name: action.payload
            };
        case 'weather/fetchLocation':
            return {
                ...state,
                cityList: action.payload
            }
        case 'weather/selectCity':
            return {
                ...state,
                selectedCity: action.payload
            }
        case 'weather/fetchForecast':
            return {
                ...state,
                forecastWeather: action.payload
            }
        case 'weather/getCurrentWeather':
            return {
                ...state,
                currentWeatherInfo: action.payload
            }
        default: 
            return state;
    }
}

export default weatherReducer;
