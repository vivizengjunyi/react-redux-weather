import axios from 'axios';

const geography = (city) => {
    return (dispatch) => {
        axios
        .get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=6f55c7ead5bb1de16181b1b90611eea9`)
        .then((res) => {
            dispatch({
                type: 'weather/fetchLocation',
                payload: res.data
            })
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }
}

export default geography;
