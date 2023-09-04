import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth.context';
import service from '../services/service.config';

function Perfil() {

  const { userData } = useContext(AuthContext);
  const [animalList, setAnimalList] = useState([]);

  useEffect(() => {
    service.get(`/user/${userData._id}/animals`)
      .then((response) => {
        setAnimalList(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los animales:', error);
      });
  }, []);
  
  return (
    <div>
        <h3>Perfil usuario {userData.username}</h3>
        <p>{userData.profileImg}</p>
        <ul>
          {animalList.map((animal) => (
            <li key={animal._id}>
              <p>Nombre: {animal.name}</p>
              <p>Raza: {animal.race}</p>
              <p>Edad: {animal.years}</p>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default Perfil