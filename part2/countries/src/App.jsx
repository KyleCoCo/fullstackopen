import { useState, useEffect } from 'react'
import countryService from './components/CountriesAPI'

const ShowOneCountry = ({name, capitalName, area, languages, flagURL}) => {
  console.log('show one country', name, capitalName, area, languages, flagURL)
  return (
    <>
      <h1>{name}</h1>
      <div>Capital {capitalName}</div>
      <div>Area {area}</div>
      <h1>Languages</h1>
      <ul>
        {languages.map(l => <li key={l}>{l}</li>)}
      </ul>
      <img src={flagURL} alt={`Flag of ${name}`} style={{ width: "200px" }} />
    </>
  )
}


const updateCountryView = (countryName, setSelectedCountry) => {
  setSelectedCountry(null); // Reset state before fetching
  countryService
      .getSpecificCountry(countryName)
      .then(setSelectedCountry)
      .catch(console.log);
}


const ShowButton = ({countryName, setSelectedCountry}) => {
  return <button onClick={() => updateCountryView(countryName, setSelectedCountry)}>Show</button>
}

const ShowCountry = ({countries}) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
    
  useEffect(() => {
    setSelectedCountry(null); // Reset state before fetching
    if (countries.length === 1) {
      updateCountryView(countries[0].name.common, setSelectedCountry)
    }
  }, [countries]);

  if(countries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  }
  const showSelectedCountry = <>
    {selectedCountry && typeof selectedCountry === "object" && (
        <ShowOneCountry 
        name={selectedCountry.name.common} 
        capitalName={selectedCountry.capital[0]} 
        area={selectedCountry.area} 
        languages={Object.values(selectedCountry.languages)} 
        flagURL={selectedCountry.flags.png} />
      )}
  </>
  if(countries.length != 1) {
    return (
      <>
      <div>
        {countries.map(c => <div key={c.name.common}>{c.name.common} <ShowButton countryName={c.name.common} setSelectedCountry={setSelectedCountry}/></div>)}
      </div>
      {showSelectedCountry}
      </>
    )
  }

  
  return (
    <>
    {showSelectedCountry}
    </>
  )
}



const App = () => {
  const [filterName, setFilterName] = useState('')
  const [countries, setCountries] = useState([])

  const hook = () => {
    if(filterName == null || filterName.length == 0) {
      return
    }
    countryService
      .getCountries(filterName)
      .then(response => {
        console.log("after searching: ", filterName, "country size: ", response.length)
        setCountries(response)
      })
  }
  
  useEffect(hook, [filterName])
  
  const handleFilterNameChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  return (<>
    <div>
      find countries
      <input value={filterName} onChange={handleFilterNameChange} ></input>
    </div>
    <ShowCountry countries={countries}/>
  </>)
}

export default App