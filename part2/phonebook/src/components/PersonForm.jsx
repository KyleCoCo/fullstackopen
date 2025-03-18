import { useState } from 'react'

const PersonForm = ({newPerson, setNewPerson, persons, setPersons}) => {
  const handleNameChange = (event) => {
    console.log(event.target.value)
    const copyNewPerson = {...newPerson}
    copyNewPerson.name = event.target.value
    setNewPerson(copyNewPerson)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    const copyNewPerson = {...newPerson}
    copyNewPerson.number = event.target.value
    setNewPerson(copyNewPerson)
  }

  

  const addNewPerson = (event) => {
    event.preventDefault()
    const trimNewName = newPerson.name.trim()
    const trimNewNumber = newPerson.number.trim()
    if(trimNewName.length == 0) {
      alert(`${trimNewName} should not be empty`)
      return
    }
    const personObject = {
      name: trimNewName,
      number: trimNewNumber,
    }
    for (let i = 0; i < persons.length; i++) {
      console.log(persons[i])
      if(persons[i].name === trimNewName) {
        alert(`${trimNewName} is already added to phonebook`)
        return
      }
    }
    setPersons(persons.concat(personObject))
    console.log(persons)
    setNewPerson(
      {
        name: '',
        number: ''
      }
    )
  }

  return (
    <form onSubmit={addNewPerson}>
      <div>
        name: 
        <input 
          value={newPerson.name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: 
        <input 
          value={newPerson.number}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
