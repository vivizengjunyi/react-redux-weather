export const setCity = (city) => {
    let cities = getCities();
    cities = cities.filter(item => item.name !== city.name)
    localStorage.setItem('cities', JSON.stringify([city, ...cities]))
}
export const getCities = () => {
    const cities = localStorage.getItem('cities');
    return JSON.parse(cities || '[]')
}