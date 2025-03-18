import { useState } from 'react'

const Persons = ({filterName, persons}) => {
  const personsToShow = filterName.length == 0
    ? persons
    : persons.filter(p => p.name.toLowerCase().indexOf(filterName.toLowerCase()) != -1)

  return (
    <>
    {personsToShow.map((person, index) => <div key={index}>{person.name} {person.number}</div>)}
    </>
  )
}

export default Persons
