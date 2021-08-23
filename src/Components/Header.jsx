import React from 'react'
import logo from '../assets/images/logo.svg'

function Header() {
    return <header className="header">
    <nav>
        <div className="logo">
            <img src={logo} alt="Todolist" ></img>
        </div>
    </nav>

    </header>
}

export default Header
