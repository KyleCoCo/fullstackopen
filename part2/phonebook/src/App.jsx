import './index.css'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Persons from './components/Persons'
import phoneService from './components/PhoneBooks'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filterName, setFilterName] = useState('')
  const [newPerson, setNewPerson] = useState(
    {
      name: 'Martin Fowler',
      number: '086-123456'
    }
  )
  const [notification, setNotification] = useState({
    message: null,
    style: null
  })

  const hook = () => {
    phoneService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }
  
  useEffect(hook, [])
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <h2>add a new</h2>
      <PersonForm newPerson={newPerson} setNewPerson={setNewPerson} persons={persons} setPersons={setPersons} setNotification={setNotification} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} setPersons={setPersons} setNotification={setNotification} />
    </div>
  )
}

export default App