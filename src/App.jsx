import './App.css'
import React from 'react'
import UserComponent from './components/UserComponent'
import Header from './components/Header'

const App = () => {
  return (
    <div className="container">
      <Header />
      <UserComponent />
    </div>
  )
}

export default App
