import { useState } from 'react'
import phoneService from './PhoneBooks'


const Delete = ({persons, person, setPersons, setNotification}) => {
  const handleDelete = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      phoneService.deleteOne(person.id)
      .then(id => {
        console.log("delete success")
        setPersons(persons.filter(p => p.id !== person.id))
        console.log("setPersons success")
      })
      .catch(error => {
        setNotification(
          {
            message: `Information of ${person.name} has already been removed from server`,
            type: 'Error'
          }
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        console.log(`${person.id} not existed, delete failed`, error)
      })
    }
    else {
      console.log(`Cancelled deleting ${person.id}`)
    }
  }
  return (
    <button onClick={handleDelete}>delete</button>
  )
}

const Persons = ({filterName, persons, setPersons, setNotification}) => {
  const personsToShow = filterName.length === 0
    ? persons
    : persons.filter(p => p.name.toLowerCase().indexOf(filterName.toLowerCase()) != -1)
 
  return (
    <>
    {personsToShow.map((person) => 
      <div key={person.id}>{person.name} {person.number} <Delete person={person} persons={persons} setPersons={setPersons} setNotification={setNotification} /></div>)}
    </>
  )
}

export default Persons
