import Select from "react-select";

import React, { useState, useEffect } from "react";
import { instance } from "../App";

function ActorsDropdown({ onChange, defaultValue, actors }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchActor();
  }, []);

  function fetchActor() {
    instance
      .get("/actor")
      .then((response) => {
        const actorsOptions = response.data.Actors.map((actor) => ({
          label: actor.name,
          value: actor._id,
        }));
        setOptions(actorsOptions);
      })
      .catch((error) => {
        console.error("Error fetching actors:", error);
      });
  }

  const handleChange = (e) => {
    fetchActor();
    onChange(e);
  };

  return (
    <Select
      className=" w-2/3 rounded-lg text-black"
      options={options}
      placeholder="Select actors..."
      onChange={handleChange}
      value={actors}
      defaultValue={[]}
      isMulti
      isClearable
      isSearchable
    />
  );
}

export default ActorsDropdown;
