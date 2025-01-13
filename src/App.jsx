import { useContext, useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import {AuthenticationContext} from './context/AuthContext'




function App() {

  const { isAuthorizes, setIsAuthorizes } = useContext(AuthenticationContext)

  return (
    <>

      {/* <Route element={<Header/>} /> */}
      <Routes>

        <Route element={<Home />} path='/' />
        <Route element={<Auth />} path='/login' />
        <Route element={<Auth insideRegister={true} />} path='/register' />
        <Route element={  <Dashboard /> } path='/dashboard' />
        <Route element={isAuthorizes ? <Project /> : <Navigate to={'/login'}/> } path='/project' />
      </Routes>
      <Footer />
    </>
  )
}

export default App
