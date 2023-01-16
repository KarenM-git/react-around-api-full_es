import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Login({ onSubmit }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(values, setValues);
  };


  // React.useEffect(() => {
  //      setIsLoggedIn(true);
  //      history.push("/");
  //    }, [values]);

  // React.useEffect(() => {
  //   setValues({});
  // }, [setIsLoggedIn]);

  return (
    <div className='auth'>
      <h2 className='auth__title'>Iniciar Sesión</h2>
      <form className='auth__form' onSubmit={handleSubmit}>
        <div className='auth__input-container'>
          <input
            className='auth__input'
            type='email'
            placeholder='Email'
            id='current-email'
            name='email'
            autoComplete='current-email'
            onChange={handleChange}
            value={values.email || ""}
          />
          <input
            className='auth__input'
            type='password'
            placeholder='Password'
            id='current-password'
            name='password'
            autoComplete='current-password'
            onChange={handleChange}
            value={values.password || ""}
          />
        </div>
        <button type='submit' className='auth__button'>Iniciar Sesión</button>
      </form>
      <Link to='/signup' className='auth__link'>
        ¿No eres miembro? Registrate aqui!
      </Link>
    </div>
  );
}

export default Login;

