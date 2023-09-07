import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";

import { uploadImageService } from "../services/upload.services.js";
import { Navigate, useNavigate } from "react-router-dom";

function Perfil() {
  const { userData } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/user/${userData._id}/animals`);

      console.log(response.data);
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }
  };

  const handleFileUpload = async (event) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }

    setIsUploading(true); // to start the loading animation

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware => uploader.single("image")

    try {
      const response = await uploadImageService(uploadData);
      console.log("BUSCAAAAAAAAAAAAAAAAAA", response);
      // or below line if not using services
      // const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/upload`, uploadData)

      setImageUrl(response.data.cloudinaryURL);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      console.log(error, "AKIII");
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.post("user/picture-update", {
        imageUrl,
      });
      getData();
    } catch (error) {
      navigate("/error");
    }
  };

  // Hacer la clausula de guardia aqui.
  if (!userInfo) {
    return (
      <div>
        <p>Cargando información del usuario...</p>
      </div>
    );
  }

  return (
    <div id="perfil-container">
      <h1>Perfil de {userInfo.username}</h1>

      <div id="img-container">
        <img src={userInfo.profileImg} alt="image-perfil" />

        <form onSubmit={handleSubmit}>
          <label>Añadir foto: </label>
          <input
            type="file"
            name="image"
            onChange={handleFileUpload}
            disabled={isUploading}
          />

          <button>Agregar</button>
        </form>
      </div>

      <div id="animales-container">
        <h2>Animales</h2>
        {userInfo.animals.length == 0 ? (
          <p>No tiene animales.</p>
        ) : (
          <div id="animales">
            {userInfo.animals.map((animal) => (
              <div key={animal._id} className="animal">
                <img src={animal.profileImage} alt="" />
                <h3>{animal.name}</h3>
                <div className="raza-edad">
                  <p>{animal.race}</p>
                  <p>{animal.years} años</p>
                  <p>{animal.genre}</p>
                </div>
                <p>Descripción: {animal.description}</p>
                <a href={`animal/${animal._id}/details`} className="editar">Editar detalles</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Perfil;
