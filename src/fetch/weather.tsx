import axios from "axios";
import { fetchForecast, ICityList } from "./../action";
import { Dispatch } from 'redux';

const weather = (item:ICityList) => {
    return (dispatch: Dispatch) => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${item.lat}&lon=${item.lon}&units=metric&exclude=hourly,minutely&appid=6f55c7ead5bb1de16181b1b90611eea9`)
            .then((res) => {
                dispatch(fetchForecast(res.data));
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }
}
export default weather;
