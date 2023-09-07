import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";

function UserDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const [userDetails, setUserDetails] = useState("");
  const [comments, setComments] = useState([]);

  const [animalId, setAnimalId] = useState();
  const [text, setText] = useState("");

  const handleAnimalIdChange = (e) => setAnimalId(e.target.value);
  const handleTextChange = (e) => setText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const ownerId = userDetails._id;

      console.log(ownerId, animalId, text);
      const commentCreated = await service.post("/comment/comment", {
        ownerId,
        animalId,
        text,
      });

      location.reload(); // Modificar esto.
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const getData = async () => {
    try {
      const userResponse = await service.get(`/user/${params.id}/details`);
      const commentsResponse = await service.get(
        `/comment/${params.id}/comments`
      );
      console.log(commentsResponse);
      console.log(userResponse);

      setUserDetails(userResponse.data);
      //setAnimalId(userResponse.data.animals);
      setComments(commentsResponse.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!userDetails) {
    return <p>Cargando información...</p>;
  }

  return (
    <div id="user-details-container">
      <div id="img-name">
        <img src={userDetails.profileImg} alt="" />
        <div>
          <p>{userDetails.username}</p>
          <p>{userDetails.email}</p>
        </div>
      </div>

      <div id="animales-container">
        <h2>Animales</h2>
        {userDetails.animals.length == 0 ? (
          <p>No tiene animales.</p>
        ) : (
          <div id="animales">
            {userDetails.animals.map((animal) => (
              <div key={animal._id} className="animal">
                <img src={animal.profileImage} alt="" />
                <h3>{animal.name}</h3>
                <div className="raza-edad">
                  <p>{animal.race}</p>
                  <p>{animal.years} años</p>
                  <p>{animal.genre}</p>
                </div>
                <p>Descripción: {animal.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div id="comments-container">
        <h2>Comments</h2>
        {
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <label>Animal: </label>
              <select onChange={handleAnimalIdChange}>
                {userDetails.animals.map((eachAnimal) => {
                  return (
                    <option value={eachAnimal._id} key={eachAnimal._id}>
                      {eachAnimal.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <br />

            <div className="input-box">
              <label htmlFor="text">Leave a comment</label>
              <textarea
                name="text"
                cols="30"
                rows="10"
                onChange={handleTextChange}
              ></textarea>
            </div>

            <br />

            <button type="submit">Send comment</button>
          </form>
        }

        <div id="comentarios">
          {comments.map((eachComment) => {
            return (
              <div>
                <p>{eachComment.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
