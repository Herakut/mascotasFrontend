import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";

function Perfil() {
  const { userData } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    service
      .get(`/user/${userData._id}/animals`)
      .then((response) => {
        console.log(response.data);
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
      });
  }, []);

  // Hacer la clausula de guardia aqui.

  return (
    <div>
      {userInfo ? (
        <div>
          <h3>Perfil usuario {userInfo.username}</h3>
          <p>{userInfo.profileImg}</p>
          <h2>Animales</h2>
          <ul>
            {userInfo.animals.map((animal) => (
              <li key={animal._id}>
                <p>Nombre: {animal.name}</p>
                <p>Raza: {animal.race}</p>
                <p>Edad: {animal.years} años</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Cargando información del usuario...</p>
      )}
    </div>
  );
}

export default Perfil;
