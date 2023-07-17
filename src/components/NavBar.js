import React from 'react'
import { Button, Container, Navbar as NavbarBs } from 'react-bootstrap'

const NavBar = ({ onClick }) => {
    return (
        <NavbarBs sticky='top' className='bg-white shadow-sm mb-3'>
            <Container className='d-flex justify-content-between'>
                <Button
                    onClick={() => onClick()}
                    variant="outline-secondary"
                    style={{ width: '3.5rem', height: '3.5rem', position: 'relative' }}
                    className="d-flex justify-content-center align-items-center"
                >
                    <svg viewBox="0 0 100 80" width="40" height="40">
                        <rect width="100" height="20"></rect>
                        <rect y="30" width="100" height="20"></rect>
                        <rect y="60" width="100" height="20"></rect>
                    </svg>
                </Button>
                <NavbarBs.Brand><img src={require("../assets/logo.png")} alt='imatge' style={{ width: '6rem' }} /></NavbarBs.Brand>
                <div>
                    <div>Configura</div><div>Comandes</div><div>Ajuda</div>
                </div>
            </Container>
        </NavbarBs>
    )
}

export default NavBar