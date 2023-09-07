import React, { useContext } from "react";
import { useState } from "react";
import service from "../services/service.config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function AnimalSignup() {
  const [name, setName] = useState("");
  const [race, setRace] = useState("mastin");
  const [years, setYears] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("non-binary");

  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleRaceChange = (e) => setRace(e.target.value);
  const handleYearsChange = (e) => setYears(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleGenreChange = (e) => setGenre(e.target.value);

  const navigate = useNavigate();

  const { userData } = useContext(AuthContext);
  console.log(userData);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await service.post(`/animal/animal-signup/${userData._id}`, {
        name,
        race,
        years,
        description,
        genre,
      });

      navigate("/perfil");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div id="crear-animal-container">
      <h1>Create Animal</h1>

      <form onSubmit={handleCreate}>
        <div className="input-box">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <br />

        <div className="input-box">
          <label>Race:</label>
          <select
            name="race"
            defaultValue={"mastin"}
            onChange={handleRaceChange}
          >
            <option value="mastin">Mastin</option>
            <option value="labrador">Labrador</option>
            <option value="border-collie">Border Collie</option>
            <option value="husky">Husky</option>
            <option value="palleiro">Palleiro</option>
            <option value="sabueso">Sabueso</option>
            <option value="pastor-Alemán">Pastor Alemán</option>
            <option value="pastor-Belga">Pastor Belga</option>
            <option value="bulldog-Frances">Bulldog Francés</option>
            <option value="bulldog-Inglés">Bulldog Inglés</option>
            <option value="boxer">Boxer</option>
            <option value="pomeramia">Pomeramia</option>
            <option value="chihuahua">Chihuahua</option>
            <option value="perdigero">Perdigero</option>
            <option value="beagle">Beagle</option>
            <option value="perro-de-aguas">Perro de aguas</option>
            <option value="pinscher-miniatura">Pinscher miniatura</option>
            <option value="galgo">Galgo</option>
            <option value="schnauzer-miniatura">Schnauzer miniatura</option>
            <option value="Yorkshire">Yorkshire</option>
            <option value="no-especificar">No especificar</option>
          </select>
        </div>

        <br />

        <div className="input-box">
          <label>Years:</label>
          <input
            type="number"
            name="years"
            value={years}
            onChange={handleYearsChange}
          />
        </div>

        <br />

        <div className="input-box">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>

        <br />

        <div className="input-box">
          <label>Genre:</label>
          <select
            name="genre"
            defaultValue={"non-binary"}
            onChange={handleGenreChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
          </select>
        </div>

        <br />

        <button type="submit">Create</button>

        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
    </div>
  );
}

export default AnimalSignup;
