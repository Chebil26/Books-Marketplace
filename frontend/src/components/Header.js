import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav , Container, NavDropdown } from 'react-bootstrap'
import { useNavigate} from 'react-router-dom'

import { LinkContainer } from 'react-router-bootstrap'

import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

function Header() {

  const history = useNavigate()
  const userLogin = useSelector(state => state.userLogin)
  const  {userInfo} = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    history('/')
  }
  return (
    <header>   
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand >home</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox />
          <Nav className="mr-auto">
          <LinkContainer to="/cart">
              <Nav.Link ><i className="fas fa-shopping-cart"></i> Saved</Nav.Link>
            </LinkContainer>

            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ): (
              <LinkContainer to="/login">
              <Nav.Link ><i className="fas fa-user"></i> Login</Nav.Link>
            </LinkContainer>
            )}

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Store' id='adminmenue'>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}

            <LinkContainer to="/stores">
              <Nav.Link >Stores</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/books">
              <Nav.Link >Books</Nav.Link>
            </LinkContainer>
          

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
    </header>
  )
}

export default Header

