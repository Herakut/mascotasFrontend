import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";

function AnimalDetails() {
  const [animalDetails, setAnimalsDetails] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [years, setYears] = useState("");
  const [description, setDescription] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleYearsChange = (e) => {
    if (e.target.value > years) {
      setYears(e.target.value);
    }
  };
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleProfileImageChange = (e) => setProfileImage(e.target.value);

  const getData = async () => {
    try {
      const response = await service.get(`/animal/${params.id}/details`);
      setAnimalsDetails(response.data);
      setName(response.data.name);
      setYears(response.data.years);
      setDescription(response.data.description);
      setProfileImage(response.data.profileImage);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async () => {
    try {
      await service.delete(`/animal/${params.id}`);
      navigate("/perfil");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await service.put(`/animal/${params.id}`, {
        name,
        years,
        description,
        profileImage,
      });

      navigate("/perfil");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (!animalDetails) {
    return (
      <div>
        <p>Cargando información del usuario...</p>
      </div>
    );
  }

  return (
    <div id="edit-animal-container">
      <h3>Editar a {animalDetails.name}</h3>

      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleNameChange}
            value={name}
          />
        </div>

        <br />

        <div className="input-box">
          <label htmlFor="years">Years</label>
          <input
            type="number"
            name="years"
            onChange={handleYearsChange}
            value={years}
          />
        </div>

        <br />

        <div className="input-box">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            onChange={handleDescriptionChange}
            value={description}
          />
        </div>

        <br />

        <div className="input-box">
          <label htmlFor="profileImage">Profile Image</label>
          <input
            type="text"
            name="profileImage"
            onChange={handleProfileImageChange}
            value={profileImage}
          />
        </div>

        <br />

        <button type="submit">Editar</button>
      </form>

      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
}

export default AnimalDetails;
