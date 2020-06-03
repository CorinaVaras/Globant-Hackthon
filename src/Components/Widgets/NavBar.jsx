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
          history.push("/")
      })
      .catch((error) => {
          console.log(error);
      });
  };
    return (
        <div className='container-navbar'>
          <Link to='/home' style={{textDecoration: 'none'}}>
            <img className='navbar-logo' src={logo} alt="logo de Share Food"/>
          </Link>

            <div className='dropdown'> 
            {user.photoURL != null ? (
                <img
                  alt="foto de perfil usuario"
                  className="navbar-profile"
                  src={user.photoURL}
                />
              ) : (
            <img className="navbar-profile" alt="foto de perfil usuario" src={perfil} />
            )}     
            
            <div className='dropdown-content'>
              <Link to="/charityForm">Ser Insitución Benéfica</Link>
              <Link to='/welcome' onClick={() => closeSession()}>Cerrar Sesión</Link> 
            </div>
            </div>
        </div>
    )
}

const MapStateToProps = state => {
  return { user : state.user}
}

export default connect(MapStateToProps, null)(NavBar);
