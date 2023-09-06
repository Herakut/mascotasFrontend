import React, { useEffect, useState, useContext } from "react";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";

function Home() {
  const [users, setUsers] = useState([]);
  const { userData } = useContext(AuthContext);

  const followUser = async (userId) => {
    try {
      const response = await service.patch(`/user/follow/${userId}`);
      if (response === 200) {
      }
    } catch (error) {
      console.error("Error al seguir al usuario:", error);
    }
  };

  const unfollowUser = async (userId) => {
    try {
      await service.patch(`/user/unfollow/${userId}`);
      // Actualiza la lista de usuarios después de dejar de seguir a uno
      const updatedUsers = users.map((user) => {
        if (user._id === userId) {
          return { ...user, isFollowing: false };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error al dejar de seguir al usuario:", error);
    }
  };

  useEffect(() => {
    service
      .get(`/user/users`)
      .then((response) => {
        const filteredUsers = response.data.filter(
          (user) => user._id !== userData._id
        );
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
      });
  }, []);

  return (
    <div>
      <div id="home-container">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <div className="user-info">
              <div id="profile-img">
                <img
                  src={user.profileImg}
                  width={100}
                  height={100}
                  alt="Imagen de perfil del usuario"
                />
              </div>
              <h4 id="user-name">{user.username}</h4>
              {user.friends.find((id) => id === userData._id) ? (
                <button onClick={() => unfollowUser(user._id)}>Unfollow</button>
              ) : (
                <button onClick={() => followUser(user._id)}>Follow</button>
              )}
            </div>
            {/* Mostrar animales del usuario */}
            <div className="user-animals">
              {user.animals.map((animal) => (
                <div key={animal._id} className="animal-card">
                  <div className="animal-info">
                    <div id="animal-profile-img">
                      <img
                        src={animal.profileImage}
                        width={100}
                        height={100}
                        alt="Imagen de perfil del animal"
                      />
                    </div>
                    <h4 id="animal-name">{animal.name}</h4>
                    {/* Mostrar más información del animal aquí */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
