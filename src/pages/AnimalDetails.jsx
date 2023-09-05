import { useEffect, useState } from "react";



function AnimalDetails() {

    const [animalsdetails, setAnimalsDetails] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/${params.id}`);
      console.log(response);
      setAnimalsDetails(response.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return <div>

  </div>;
}

export default AnimalDetails;
