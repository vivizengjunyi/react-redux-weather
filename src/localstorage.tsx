import { ICityList } from "./action";

export const setCity = (city:ICityList) => {
    let cities:ICityList[] = getCities();
    cities = cities.filter(item => item.name !== city.name)
    localStorage.setItem('cities', JSON.stringify([city, ...cities]))
}
export const getCities = () => {
    const cities = localStorage.getItem('cities');
    return JSON.parse(cities || '[]')
}