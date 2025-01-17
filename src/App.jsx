import { useState } from 'react'
import { MyButton } from './components/MyLitButton'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(prev => prev + 1)
  }

  return (
    <div className="app">
      <h1>React + Lit Elements</h1>
      <div className="card">
        <p>Count: {count}</p>
        <MyButton 
          label={`Click me! (${count})`} 
          onClick={handleClick}
        />
      </div>
      <p className="read-the-docs">
        This button is a Lit Element used in React
      </p>
    </div>
  )
}

export default App