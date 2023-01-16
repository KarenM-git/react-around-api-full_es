import { useLocation, Link } from "react-router-dom";
import logo from "../images/logo.png";

function Header({onLogout, userData}) {
  const { pathname } = useLocation();
  
  return (
    <header className='header'>
      <img src={logo} className='header__logo' alt='around the U.S. logo' />
      {pathname === "/signin" && (
        <Link className='header__text' to='/signup'>
          Registrarse
        </Link>
      )}
      {pathname === "/signup" && (
        <Link to='/signin' className='header__text'>
          Iniciar Sesión
        </Link>
      )}
      {pathname === "/" && (
        <div className='header__info'>
          <span className='header__text'> { userData.email}</span>
          <button className='header__bttn' onClick={onLogout}>
            Cerrar Sesión
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
