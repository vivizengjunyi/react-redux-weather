const defaultState = {
    name: '',
    cityList: [],
    selectedCity: null,
    forecastWeather: null,
    currentWeatherInfo: null
}
const weatherReducer = (state = defaultState, action) => {
    switch(action.type) {
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
