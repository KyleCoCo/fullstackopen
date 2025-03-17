import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote_map, setVoteMap] = useState(new Map())
  const [mostVoteInx, setMostVoteInx] = useState(0)

  const set_random_anecdote = () => {
    const inx = Math.floor(Math.random() * anecdotes.length)
    setSelected(inx)
  }

  const vote_map_increase = () => {
    const inx = selected
    const new_vote_map = new Map(vote_map)
    new_vote_map.set(inx, (vote_map.get(inx) || 0) + 1)
    setVoteMap(new_vote_map)
    if(new_vote_map.get(inx) > (new_vote_map.get(mostVoteInx) || 0)) {
      setMostVoteInx(inx)
    }
  }

  return (
  <>
    <h1>
      Anecdote of the day
    </h1>
    <div>
      {anecdotes[selected]}
    </div>
    <div>
      has {vote_map.get(selected) || 0} votes
    </div>
    <div>
      <button onClick={() => vote_map_increase()}>vote</button>
      <button onClick={() => set_random_anecdote()}>next anecdote</button>
    </div>
    <h1>
      Anecdote with most votes
    </h1>
    <div>
    {anecdotes[mostVoteInx]}
    </div>
    <div>
      has {vote_map.get(mostVoteInx) || 0} votes
    </div>
  </>
  )
}

export default App