import { useState } from 'react'

const Filter = ({filterName, setFilterName}) => {
  const handleFilterNameChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }
  return (
    <div>
      filter shown with
      <input value={filterName} onChange={handleFilterNameChange}/>
    </div>
  )
}

export default Filter
