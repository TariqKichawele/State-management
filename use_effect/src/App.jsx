import { useEffect, useState } from 'react';
import './App.css'

function Stopwatch() {
  const [ time, setTime ] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 1)
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div>Time: {time}</div>
}

function App() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    fetch('/names.json')
    .then(response => response.json())
    .then(data => setNames(data));
  }, []);

  const [ selectedNameDetails, setSelectedNameDetails ] = useState(null);

  const onSelectName = (name) => {
    fetch(`/${name}.json`)
    .then(response => response.json())
    .then(data => setSelectedNameDetails(data));
  }
  return (
    <div>
      <Stopwatch />
     <div>
      {names.map((name, index) => (
        <button onClick={() => onSelectName(name)} key={index}>{name}</button>
      ))}
     </div>
     <div>{JSON.stringify(selectedNameDetails)}</div>
    </div>
  )
}

export default App
