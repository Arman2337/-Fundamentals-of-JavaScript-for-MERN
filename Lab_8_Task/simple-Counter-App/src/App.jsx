import { useState } from 'react'
import './App.css'
import CounterApp from './CounterApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CounterApp/>
    </>
  )
}

export default App
