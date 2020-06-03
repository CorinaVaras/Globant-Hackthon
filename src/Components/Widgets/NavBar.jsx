import React from 'react'
import './NavBar.css'
import logo from '../../img/Logo-Share.png'
import perfil from '../../img/default_profile.jpg'
import { auth } from '../../firebase-config'
import { useHistory, Link } from 'react-router-dom'
import { connect } from 'react-redux';

const NavBar = ({user}) => {
  
  const history = useHistory();
   
  const closeSession = () => {
      auth.signOut()
      
      .then(() => {
          
          console.log('Saliendo');
          history.push("/")
          console.log('despues del historypush')
          
      })
      .catch((error) => {
          console.log(error);
      });
  };
    return (
        <div className='container-navbar'>
          <Link to='/Home' style={{textDecoration: 'none'}}>
            <img className='navbar-logo' src={logo} alt="logoNavbar"/>
          </Link>

            <div className='dropdown'> 
            {user.photoURL != null ? (
                <img
                  className="navbar-profile"
                  alt="fotoperfil"
                  src={user.photoURL}
                />
              ) : (
            <img className="navbar-profile" alt="fotoperfil" src={perfil} />
            )}     
            
            <div className='dropdown-content'>
                 <a href="/CharityForm">Ser Insitución Benéfica</a>
                <a href='/welcome' onClick={() => closeSession()}>Cerrar Sesión</a> 
            </div>
            </div>
        </div>
    )
}

const MapStateToProps = state => {
  return { user : state.user}
}

export default connect(MapStateToProps, null)(NavBar);
