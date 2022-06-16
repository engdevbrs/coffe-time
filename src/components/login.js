import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login.css';
import acceso from './images/acceso.png';

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

const Login = ({ setToken }) => {
    const [client_id, setUserName] = useState();
    const [client_secret, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            client_id,
            client_secret,
            grant_type: 'client_credentials',
            audience: 'https://escalab.academy'
        });
        if(token.error === "access_denied"){
          setToken(undefined);
        }else{
          setToken(token);
        }
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
              placeholder="Ingrese su usuario" onChange={e => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Ingrese su contraseña" onChange={ e => setPassword(e.target.value) }
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Ingresar
            </button>
          </div>
          <p className="guesst text-right mt-2">
            Ingresar sin iniciar sesión: <a href="#">Ir</a>
          </p>
        </div>
      </form>
    </div>
    </>
    )
}

Login.propTypes = { setToken: PropTypes.func.isRequired };

export default Login