import { BrowserRouter as Router, Routes, Route, Link } from "react-router"
import React from 'react'
import Home from './components/Home'
import Add from './components/Add'
import Read from './components/Read'

function App() {

  return (
    <>
      <Router>
        <nav className='bg-gray-800 shadow-lg'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <ul className='flex space-x-6 py-4'>
              <li>
                <Link to='/'
                  className='text-white hover:text-gray-300'
                >Home</Link>
              </li>
              <li>
                <Link to='/read'
                  className='text-white hover:text-gray-300'
                >Read Blogs</Link>
              </li>
              <li>
                <Link to='/add'
                  className='text-white hover:text-gray-300'
                >Add Blogs</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/read' element={<Read />} />
          <Route path='/add' element={<Add />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
