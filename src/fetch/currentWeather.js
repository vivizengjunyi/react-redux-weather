import axios from 'axios';

const currentWeather = (selectedCity) => {
    return (dispatch) => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&appid=6f55c7ead5bb1de16181b1b90611eea9`)
            .then((res) => {
                dispatch({
                    type: 'weather/getCurrentWeather',
                    payload: res.data
                })
            })
            .catch(err => console.log(err))
    }
}

export default currentWeather;