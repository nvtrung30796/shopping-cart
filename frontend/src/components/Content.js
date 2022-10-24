import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartPlus, faUser} from '@fortawesome/free-solid-svg-icons'
import {Link, Outlet} from 'react-router-dom'
import '../styles/header.scss'
import {useAuth, logout} from '../firebase'
import {useNavigate} from 'react-router-dom'

function Content(props) {
    const {countCartItems} = props
    const navigate = useNavigate()

    
    const currentUser = useAuth()
    async function handleLogout() {
        try {
           await logout()
           navigate('/')
        }        
        catch {
            alert("ERROR!")
        }
    }
  


  return (
    <div className="App mb-5">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand >
          <Link className='brand' to='basket'>Shopping Cart</Link>
          
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="User" id="collasible-nav-dropdown">
              
              <NavDropdown.Item >
                <Link style={{color: "black"}} to='profile'>Profile</Link>
                </NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
          <div  style={{color: "white"}}>
              <FontAwesomeIcon className="cart__icon" icon={faUser}></FontAwesomeIcon>
                 &nbsp;
                {currentUser?.email}
            
              </div>
          </Nav>

          <Nav>
            <Nav.Link className="cart" >
              {
                countCartItems ? ( <button className="cart__btn">{countCartItems}</button>) : ('')
              }
              <FontAwesomeIcon className="cart__icon" icon={faCartPlus}></FontAwesomeIcon>

              </Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
       
      </Container>
    </Navbar>



      <Outlet/>
      





    </div>
  )
}

export default Content