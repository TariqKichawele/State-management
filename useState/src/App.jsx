import { useState } from 'react'
import './App.css'

function NameList() {
  const [ list, setList ] = useState(['Jack', 'Jill', 'John']);
  const [ name, setName ] = useState("")

  const addName = () => {
    setList([...list, name]);
    setName('')
  }

  return (
    <div>
      <ul>
        {list.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <input  
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addName}>Add name</button>
    </div>
  )
}

function Counter() {
  const [ counter, setCounter ] = useState(10);

  const add = () => {
    setCounter(counter + 1);
  }

  return (
    <div className='app'>
      <button onClick={add}>
        count = {counter}
      </button>
    </div>
  )
}

function App() {
  return (
    <>
      <Counter />
      <NameList />
    </>
  )
}

export default App
