import React, { createContext, useEffect, useState } from 'react';
import './login.css';
import acceso from './images/acceso.png';
import {useNavigate} from 'react-router-dom';
import { Alert } from "react-bootstrap";

export const UserContext = createContext(false);

async function loginUser(credentials) {
    return fetch('https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/oauth/token', {
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   };

const Login = () => {
  const [client_id, setUserName] = useState();
  const [client_secret, setPassword] = useState();
  let [intentos, setIntentos] = useState(0);
  let [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  let loginLock = localStorage.getItem("loginLock");
  repeatEachMinute();

  useEffect ( () => {
    if(loginLock !== null){
      setDisabled(true);
      setIntentos(3);
    }
  },[]);
  
  const handleSubmit = async e => {
      e.preventDefault();
      const token = await loginUser({
          client_id,
          client_secret,
          grant_type: 'client_credentials',
          audience: 'https://escalab.academy'
      }); 
      if(token.error === "access_denied"){
        intentos = intentos + 1;
        setIntentos(intentos);
        if(intentos === 3){
          let attempsFailed = new Date();
          localStorage.setItem("loginLock",attempsFailed);
          setDisabled(true);
        }
      }else{
        setIntentos(0);
        setDisabled(false);
        sessionStorage.setItem('tokenUser', JSON.stringify(token));
        navigate('/pedidos');
      }
    }

    function repeatEachMinute() {
        if(loginLock !== null){
        setInterval(unlockLogin,60000);
      }
    }
    
    function unlockLogin(){
      let loginDate = new Date();
      let loginDateAux = new Date(loginDate.getTime());
      let loginLockAux = new Date(Date.parse(loginLock));
      let diff =  loginDateAux - loginLockAux;
      let fecha = Math.round(diff/1000/60);
      if(fecha > 14){
        clearInterval();
        setIntentos(0);
        localStorage.removeItem("loginLock");
        setDisabled(false);
        window.location.reload();
      }
      return fecha;
    }
    
  return (
      <>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title"><img src={ acceso } width='64'/></h3>
            <div className="form-group mt-3">
              <label>Usuario</label>
              <input
                type="text"
                className="form-control mt-1"
                disabled={disabled}
                placeholder="Ingrese su usuario" onChange={e => setUserName(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control mt-1"
                disabled={disabled}
                placeholder="Ingrese su contraseña" onChange={ e => setPassword(e.target.value) }
              />
              { intentos > 0 && intentos <= 2  ? <Alert className='mt-3 p-2' key='danger' variant='danger'>
                {`Te quedan ${3 - intentos} intentos`}
                </Alert> : intentos > 2 ? <Alert className='mt-3 p-2' key='danger' variant='danger'>Lo sentimos,<br/>su cuenta ha sido bloqueada por {15 - unlockLogin()} minutos.</Alert> : <></>
                }
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" disabled={disabled}>
                Ingresar
              </button>
            </div>
            <p className="guesst text-right mt-2">
              Ingresar sin iniciar sesión: <a href="/cartera">Ir</a>
            </p>
          </div>
        </form>
      </div>
      </>
      )
  }

export default Login