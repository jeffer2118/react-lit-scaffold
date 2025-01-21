import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { MyButton } from './components/MyLitButton'
import TestPage from './pages/TestPage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(prev => prev + 1)
  }

  return (
    <BrowserRouter>
      <div className="app">
        <nav>
          <Link to="/">Home</Link> | <Link to="/test">Test Components</Link>
        </nav>
        
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="/" element={
            <>
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
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App