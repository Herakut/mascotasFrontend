import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const navigate = useNavigate();

  const { isUserActive, verifyToken } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    // ! ...
    verifyToken(); // verificar un token que no existe para reiniciar los estados

    navigate("/login");
  };

  return (
    <div>
      <Link to="/">Home</Link>

      {isUserActive === true ? (
        <>
          <Link to="/perfil">Pagina privadas</Link>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </>
      ) : (
        <>
          <Link to="/signup">Registro</Link>
          <Link to="/login">Acceso</Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
