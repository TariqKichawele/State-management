import { useCallback, useMemo, useState } from 'react'
import './App.css'



function SortedList({ list, sortedFunc }) {

  const sortedList = useMemo(() => {
    return [...list].sort(sortedFunc);
  }, [list, sortedFunc]);

  return <div>{sortedList.join(', ')}</div>
}



function App() {
  const [ numbers ] = useState([10, 20, 30]);
  const total = useMemo(
    () => numbers.reduce((acc, number) => acc + number, 0),
    [numbers]
  );

  const [ names ] = useState(['John', 'Paul', 'Ringo']);

  const [ count1, setCount1 ] = useState(0);
  const [ count2, setCount2 ] = useState(0);
  const countTotal = count1 + count2;

  const sortedFunc = useCallback((a, b) => a.localeCompare(b) * -1, []);

  return (
    <>
      <div>Total: {total}</div>
      <div>{names.join(',')}</div>
      <SortedList list={names} sortedFunc={sortedFunc} />
      <button onClick={() => setCount1(count1 + 1)}>Count 1: {count1}</button>
      <button onClick={() => setCount2(count2 + 1)}>Count 2: {count2}</button>
      <div>Total: {countTotal}</div>
    </>
  )
}

export default App
