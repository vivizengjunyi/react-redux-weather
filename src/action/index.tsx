export const setName = (val: string) => {
    return {
        type: 'weather/setName',
        payload: val
    };
};
export interface ICityList {
    name: string,
    lat: number,
    lon: number,
    country: string,
    state: string,
}

export const fetchLocation = (val: ICityList[]) => {
    return {
        type: 'weather/fetchLocation',
        payload: val
    }
}

export const selectCity = (val: ICityList) => {
    return {
        type: 'weather/selectCity',
        payload: val
    }
}

interface ITemp {
    day: number,
    min: number,
    max: number,
    night: number,
    eve: number,
    morn: number
}
export interface IForeCastWeatherDaily {
    weather: any[];
    temp: ITemp;
    humidity: number;
    name: string;
    dt: number;
    timezone: number;
}
export interface IForeCastWeather {
    daily: IForeCastWeatherDaily[],
    timezone: string;
}

export const fetchForecast = (val: IForeCastWeather) => {
    return {
        type: 'weather/fetchForecast',
        payload: val
    }
}
interface ICurrentWeather {
    icon: string;
    main: string;
}
interface ICurrentMain {
    temp: number,
    temp_min: number,
    temp_max: number,
    humidity: number,
}
export interface IWeather {
    name: string,
    dt: number,
    timezone: number,
    weather: ICurrentWeather[],
    main:  ICurrentMain,
}
export const getCurrentWeather = (val: IWeather) => {
    return {
        type: 'weather/getCurrentWeather',
        payload:val
    }
}

export const chooseCity = (selectedCity: ICityList, name: string) => {
    return {
        type: 'weather/chooseCity',
        payload: {selectedCity, name}
    }
}



