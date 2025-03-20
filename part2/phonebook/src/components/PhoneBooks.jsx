import axios from 'axios'

const base_url = "http://bitcoin.linkpc.net:3000/persons"

const getAll = () => {
    return axios
      .get(base_url)
      .then(response => response.data)
}

const deleteOne = (id) => {
    return axios
      .delete(`${base_url}/${id}`)
      .then(response => response.data)
}

const create = (person) => {
    return axios
      .post(base_url, person)
      .then(response => response.data)
}

const update = (person) => {
    return axios
      .put(`${base_url}/${person.id}`, person)
      .then(response => response.data)
}

export default {
    getAll, deleteOne, create, update
}