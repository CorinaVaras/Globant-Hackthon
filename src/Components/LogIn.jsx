import React, { useState } from "react";
import './SignUp.css'
import './LogIn.css';
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "./Widgets/Button";
import google from "../img/google.png";
import { firebase, auth } from '../firebase-config'
import logo from '../img/Logo-Share.png'
import { connect } from "react-redux";
import { setUser } from "../actions/action";

// objeto de configuracion de estilos de material ui
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "29ch",
      margin: "3px",
    },
    "& label.Mui-focused": {
      color: "#469D8B",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#469D8B",
    },
  },
}));



const LogIn = ({setUser}) => {
  const classes = useStyles();
  const history = useHistory();

// Manejan el estado de las funciones para crear una cuenta nueva
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);

// función para crear cuenta
const signIn = async (e) => {
  e.preventDefault();

  if (!email.trim()) {
    setError("Ingrese Email*");
    return;
  }
  if (!password.trim()) {
    setError("Ingrese password*");
    return;
  }
  if (!password.length < 6) {
    setError("Pasword debe tener 6 caracteres o más*");
    return;
  }
  setError(null);
  register();
};

const register = (async () => { console.log('entro click')
  try {
    const res = await auth.signInWithEmailAndPassword(email, password);
    setUser({ user: res.user });
    localStorage.setItem("user", JSON.stringify(res.user));
    console.log('data' + res.user);
    history.push("/home");
  } catch (error) {
    if (error.code === "auth/invalid-email") {
      setError("Email no válido");
    }
    if (error.code === "auth/email-already-in-use") {
      setError("Email ya esta registrado");
    }
  }
});

const signUpGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
  .then((response) => {
    setUser({ user: response.user });
    localStorage.setItem("user", JSON.stringify(response.user));
    history.push('/home')
  })
  .catch((error) => {
      console.log(error)
  })
}

  return (
    <>
      
      <div className="container-logIn">
      <img className='logo-login' src={logo} alt="logo"/>
        
        <form onSubmit={signIn} className={classes.root} noValidate autoComplete="off">
          {error && <div style={{ color: "darkred" }}>{error}</div>}
          <TextField 
          id="standard-basic" 
          label="Email"
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email} />
          <TextField
          id="standard-basic" 
          label="Contraseña"
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
           />
        </form>
        <div className="container-end">
          <div className="container-conditions">
          </div>
          <Button onClick={() => register()} title="Ingresar" /> 
          <div className="container-btn-google">
            <button className="btn-google" onClick={signUpGoogle}>
              <img className="google" src={google} alt="google"/>
              Ingresa con Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const MapStateToProps = (state) => {
  return { user: state.user };
};
const MapDispatchToProps = { setUser };

export default connect(MapStateToProps, MapDispatchToProps)(LogIn);

