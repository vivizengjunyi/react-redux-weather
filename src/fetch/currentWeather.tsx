import axios from 'axios';
import { getCurrentWeather, ICityList } from './../action';
import { Dispatch } from 'redux';

const currentWeather = (selectedCity:ICityList) => {
    return (dispatch: Dispatch) => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&appid=6f55c7ead5bb1de16181b1b90611eea9`)
            .then((res) => {
                dispatch(getCurrentWeather(res.data));
            })
            .catch(err => console.log(err))
    }
}

export default currentWeather;