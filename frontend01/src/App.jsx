import { useState } from 'react'
import Navbar from './Components/navbar';
import Sidebar from './Components/sidebar';
import Connect01 from './Components/connect01';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
          <Connect01 />
        </div>
      </main>
      <footer></footer>
    </>
  )
}


export default App
