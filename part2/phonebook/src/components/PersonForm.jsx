import { useState } from 'react'
import phoneService from './PhoneBooks'

const PersonForm = ({newPerson, setNewPerson, persons, setPersons, setNotification}) => {
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
        if(window.confirm(`${trimNewName} is already added to phonebook, replace the old number with a new one?`)) {
          personObject.id = persons[i].id
          phoneService.update(personObject)
          .then(response => {
            console.log('response: ', response)
            setPersons(persons.map(p => p.name === trimNewName ? response : p))
            setNewPerson(
              {
                name: '',
                number: ''
              }
            )
            setNotification(
              {message: `Updated ${trimNewName}'s number`}
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            console.log("Error in repleacing the person number", error)
          })
        } 
        return
      }
    }
    phoneService.create(personObject)
    .then(response => {
      setPersons(persons.concat(response))
      console.log(persons)
      setNewPerson(
        {
          name: '',
          number: ''
        }
      )
      setNotification(
        {message: `Added ${response.name}`}
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })
    .catch(error => {
      console.log('error in create a new person', error)
      setNotification(
        {
          message: `${error.response.data.error}`,
          type: 'Error'
        }
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })
    
    
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
