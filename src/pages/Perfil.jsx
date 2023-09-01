import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth.context';

function Perfil() {

  const { userData } = useContext(AuthContext);
  

  return (
    <div>
        <h3>Perfil usuario {userData.username}</h3>
        <p>{userData.profileImg}</p>
    </div>
  )
}

export default Perfil