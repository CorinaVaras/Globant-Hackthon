import React, { useState } from "react";
import './SignUp.css'
import { useHistory } from 'react-router-dom'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import logo from "../img/logo-white.png";
import Button from "./Widgets/Button";
// import Switch from "@material-ui/core/Switch";
import { auth } from '../firebase-config'

import { orange, grey } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


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

const PurpleSwitch = withStyles({
  switchBase: {
    color: grey,
    '&$checked': {
      color: orange[800],
    },
    '&$checked + $track': {
      backgroundColor: orange[800],
    },
  },
  checked: {},
  track: {},
})(Switch);



const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();

  // función del aceptar terminos y condiciones

const [state, setState] = React.useState({
  checkedA: false,
  
});

const handleChange = (event) => {
  setState({ ...state, [event.target.name]: event.target.checked });
};


// Manejan el estado de las funciones para crear una cuenta nueva
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [name, setName] = useState("");
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

const register = (async () => { 
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    console.log(res.user);
    alert("Se ha creado correctamente tu cuenta!");
    history.push("/login");
  } catch (error) {
    if (error.code === "auth/invalid-email") {
      setError("Email no válido");
    }
    if (error.code === "auth/email-already-in-use") {
      setError("Email ya esta registrado");
    }
  }
});



  return (
    <>
     
      <div className="container-signUp">
        <h1>Registrarse</h1>
        <p className='text-login'>
          Ingresa la Informacón requerida a continuación para
          completar tu registro
        </p>
        <form onSubmit={signIn} className={classes.root} noValidate autoComplete="off">
          {error && <div style={{ color: "darkred" }}>{error}</div>}
          <TextField 
          id="standard-basic" 
          label="Nombre" 
          type='name'
          onChange={(e) => setName(e.target.value)}
          value={name}/>
          <TextField 
          id="standard-basic" 
          label="Apellido" />
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
        <div className="container-login-end">
          <div className="container-conditions">
            <FormGroup>
              <FormControlLabel
                control={<PurpleSwitch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                label="Al ingresar o registrarte, estás aceptando los Términos y
                Condiciones de ShareFood"
              />
            </FormGroup>
          </div>

          <Button disabled={!state.checkedA} type='submit' onClick={() => register()} title='Ingresar'/>
        </div>
      </div>
    </>
  );
};

export default SignUp;