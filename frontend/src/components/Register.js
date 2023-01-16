import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({onSubmit}) {
 

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
  }

  return (
    <div className='auth'>
      <h2 className='auth__title'>Registrarse</h2>
      <form className='auth__form' onSubmit={handleSubmit}>
        <div className='auth__input-container'>
          <input
            type='email'
            placeholder='Email'
            id='new-email'
            name='email'
            autoComplete='new-email'
            className='auth__input'
            onChange={handleChange}
            value={values.email}
          />
          <input
            type='password'
            placeholder='Password'
            id='new-password'
            name='password'
            autoComplete='new-password'
            className='auth__input'
            onChange={handleChange}
            values={values.password}
          />
        </div>
        <button type='submit' className='auth__button'>Registrarse</button>
      </form>
      <Link to='/signin' className='auth__link'>
        ¿Eres miembro? Inicia Sesión aquí!
      </Link>
    </div>
  );
}

export default Register;
