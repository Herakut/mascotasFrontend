import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";

function UserDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const [userDetails, setUserDetails] = useState("");
  const [comments, setComments] = useState([])

  const [animalId, setAnimalId] = useState();
  const [text, setText] = useState("");

  const handleAnimalIdChange = (e) => setAnimalId(e.target.value);
  const handleTextChange = (e) => setText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const ownerId = userDetails._id;

      console.log(ownerId, animalId, text)
      const commentCreated = await service.post("/comment/comment", { ownerId, animalId, text });

      location.reload();
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const getData = async () => {
    try {
      const userResponse = await service.get(`/user/${params.id}/details`);
      const commentsResponse = await service.get(`/comment/${params.id}/comments`)
      console.log(commentsResponse)
      console.log(userResponse)
      
      setUserDetails(userResponse.data);
      //setAnimalId(userResponse.data.animals);
      setComments(commentsResponse.data)
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
    <div>
      <div id="img-name">
        <img src={userDetails.profileImg} alt="" />
        <div>
          <p>{userDetails.username}</p>
          <p>{userDetails.email}</p>
        </div>
      </div>
      <div id="user-details-animals">
        <h3>Animals</h3>
        {userDetails.animals.map((eachAnimal) => {
          return (
            <div className="user-detail-animal" key={eachAnimal._id}>
              <img src={eachAnimal.profileImage} alt="" />
              <p>{eachAnimal.name}</p>
              <p>{eachAnimal.years}</p>
              <p>{eachAnimal.genre}</p>
              <p>{eachAnimal.description}</p>
            </div>
          );
        })}
      </div>
      <div>Comments</div>
      {
        <form onSubmit={handleSubmit}>
          <label>Animal: </label>
          <select
            name=""
            onChange={handleAnimalIdChange}
          >
            {userDetails.animals.map((eachAnimal) => {
              return (
                <option value={eachAnimal._id} key={eachAnimal._id}>
                  {eachAnimal.name}
                </option>
              );
            })}
          </select>

          <br />

          <label htmlFor="text">Leave a comment</label>
          <textarea
            name="text"
            cols="30"
            rows="10"
            onChange={handleTextChange}
          ></textarea>

          <br />

          <button type="submit">Send comment</button>
        </form>
      }

      <div>
        {
            comments.map((eachComment) => {
                return (
                    <p>{eachComment.text}</p>
                )
            })
        }
      </div>
    </div>
  );
}

export default UserDetails;
