import React, { useContext } from 'react'
import { useState } from "react";
import service from "../services/service.config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';


function AnimalSignup () {

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

  const navigate = useNavigate()

  const { userData } = useContext(AuthContext);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await service.post(`/animal/animal-signup/${userData._id}`, {
        name,
        race,
        years,
        description,
        genre
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
  }


  return (
    <div>
      <h1>Create Animal</h1>

      <form onSubmit={handleCreate}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />

        <br />

        <label>Race:</label>
        <select name="race" defaultValue={'mastin'} onChange={handleRaceChange}>
          <option value="mastin">Mastin</option>
          <option value="labrador">Labrador</option>
          <option value="border-collie">Border Collie</option>
        </select>

        <br />

        <label>Years:</label>
        <input
          type="number"
          name="years"
          value={years}
          onChange={handleYearsChange}
        />

        <br />

        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />

        <br />

        <label>Genre:</label>
        <select name="genre" defaultValue={'non-binary'} onChange={handleGenreChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-Binary</option>
        </select>

        <br />

        <button type="submit">Create</button>

        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
    </div>
  )
}

export default AnimalSignup