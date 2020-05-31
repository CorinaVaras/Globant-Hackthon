import React from 'react'
import './NavBar.css'
import logo from '../../img/Logo-Share.png'
import perfil from '../../img/default_profile.jpg'

const NavBar = () => {
    return (
        <div className='container-navbar'>
            <img className='navbar-logo' src={logo} alt="logoNavbar"/>

            <div className='dropdown'> 
            {/* {user.photoURL != null ? (
                <img
                  className="photo-post-img"
                  alt="fotoperfil"
                  src={user.photoURL}
                />
              ) : (
            )}      */}
            <img className="navbar-profile" alt="fotoperfil" src={perfil} />
            
            <div className='dropdown-content'>
                 <a href="https://www.w3schools.com/tags/att_a_href.asp">Ver mi perfil</a>
                <a href="https://www.w3schools.com/tags/att_a_href.asp">Cerrar Sesión</a> 
            </div>
            </div>
                {/* <img src={perfil} alt="defaultProfile"/>    */}
        </div>
    )
}

export default NavBar
