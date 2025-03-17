import { useState } from 'react'

const Button = ({click, text}) =>{
  return <button onClick={click}>
      {text}
  </button>
}

const Display = ({text, num}) => (<div>{text} {num}</div>)

const StatisticLine = ({text, num}) => {
  return (
    <Display text={text} num={num} />
  )
}

const Statistics = ({good, neutral, bad}) => {
  const _sum = good+neutral+bad
  if(_sum == 0) {
    return (<div>No feedback given</div>)
  }
  const get_average = () => {
    return (good-bad) / _sum
  }

  const get_positive = () => {
    return String(good/(_sum)*100)+' %'
  }

  return (<>
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>neutral</td>  
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>bad</td>  
          <td>{bad}</td>
        </tr>
        <tr>
          <td>all</td>  
          <td>{_sum}</td>
        </tr>
        <tr>
          <td>average</td>  
          <td>{get_average()}</td>
        </tr>
        <tr>
          <td>positive</td>  
          <td>{get_positive()}</td>
        </tr>
      </tbody>
  </table>
  </>)
    
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
    <h1>give feedback</h1>
    <div>
      <Button click={() => setGood(good+1)} text="good"/>
      <Button click={() => setNeutral(neutral+1)} text="neutral"/>
      <Button click={() => setBad(bad+1)} text="bad"/>
    </div>
    <h1>statistics</h1>
    <Statistics good={good} neutral={neutral} bad={bad} />
    
    </>
  )
}

export default App