import React, { useEffect, useState, useContext } from "react";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

//llama al be para ver lo amigos.

function Home() {
  const [users, setUsers] = useState([]);
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const followUser = async (userId) => {
    try {
      const response = await service.patch(`/user/follow/${userId}`);
      if (response.status == 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error al seguir al usuario:", error);
    }
  };

  const unfollowUser = async (userId) => {
    try {
      const response = await service.patch(`/user/unfollow/${userId}`);
      console.log(response.status);
      if (response.status == 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error al dejar de seguir al usuario:", error);
    }
  };

  useEffect(() => {
    service
      .get(`/user/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
      });
  }, []);

  if (!users) {
    return <p>Cargando información...</p>;
  }

  return (
    <div>
      <div id="home-container">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <a href={`/user/${user._id}/details`} className="user-info">
              <div id="profile-img">
                <img
                  src={user.profileImg}
                  width={100}
                  height={100}
                  alt="Imagen de perfil del usuario"
                />
              </div>
              <h4 id="user-name">{user.username}</h4>

              {user.friends.find(
                (eachFriend) => eachFriend._id === userData._id
              ) ? ( // userData=a mi id, utiliza esto
                <button onClick={() => unfollowUser(user._id)}>Unfollow</button>
              ) : (
                <button onClick={() => followUser(user._id)}>Follow</button>
              )}
            </a>            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
