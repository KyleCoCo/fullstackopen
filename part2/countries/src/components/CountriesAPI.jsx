import axios from 'axios'

const base_url = "https://studies.cs.helsinki.fi/restcountries/api"


const getAll = () => {
    return axios.get(base_url + "/all")
    .then(response => response.data)
}

const getCountries = (name) => {
    if(name === null) {
        return null
    }
    return getAll()
    .then(countries => {
        return countries.filter(c => c.name.common.toLowerCase().indexOf(name.toLowerCase()) !== -1)
    })
}

const getSpecificCountry = (name) => {
    return axios.get(`${base_url}/name/${name}`)
    .then(response => response.data)
}

export default {
    getCountries,
    getSpecificCountry
}