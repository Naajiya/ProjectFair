import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {AuthenticationContext} from '../context/AuthContext';



function Header() {

  const { isAuthorizes, setIsAuthorizes } = useContext(AuthenticationContext)


  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.clear()
    setIsAuthorizes(false)
    navigate('/')
  }

  return (
    <>
      <div>
        <div>
          <Navbar className="bg-body-tertiary" >
            <Container>
              <Navbar.Brand href="#home">
                <Link to={'/'} className='text-danger'><i class="fa-brands fa-phoenix-squadron"></i></Link>
                Project Fair
              </Navbar.Brand>
              <div>
                <button onClick={handleLogout} className='btn btn-info'>Logout</button>
              </div>
            </Container>
          </Navbar>
        </div>
      </div>
    </>
  )
}

export default Header