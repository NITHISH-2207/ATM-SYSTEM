import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center" className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-4xl font-bold text-green-500 mb-4">NITHISH</h1>
        </div>
      </section>
    </>
  )
}

export default App