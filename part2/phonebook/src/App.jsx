import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
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
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <h2>add a new</h2>
      <PersonForm newPerson={newPerson} setNewPerson={setNewPerson} persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} setPersons={setPersons}/>
    </div>
  )
}

export default App