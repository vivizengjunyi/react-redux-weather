export const setName = (val) => {
    return {
        type: 'weather/setName',
        payload: val
    };
};

export const fetchLocation = (val) => {
    return {
        type: 'weather/fetchLocation',
        payload: val
    }
}

export const selectCity = (val) => {
    return {
        type: 'weather/selectCity',
        payload: val
    }
}

export const fetchForecast = (val) => {
    return {
        type: 'weather/fetchForecast',
        payload: val
    }
}
 
export const getCurrentWeather = (val) => {
    return {
        type: 'weather/getCurrentWeather',
        payload:val
    }
}



