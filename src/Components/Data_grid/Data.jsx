import React, { useEffect, useState } from "react";
import axios from "axios";

const Data = () => {
  const [rockets, setRockets] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v4/rockets")
      .then((response) => {
        setRockets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the data", error);
      });
  }, []);

  return (
    <div>
      <h1>SpaceX Rockets</h1>
      <ul>
        {rockets.map((rocket) => (
          <li key={rocket.id}>{rocket.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Data;
