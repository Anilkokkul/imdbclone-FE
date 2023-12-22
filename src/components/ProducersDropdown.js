import Select from "react-select";

import React, { useState, useEffect } from "react";
import { instance } from "../App";

function ProducersDropdown({ onChange, producer }) {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    instance
      .get("/producer")
      .then((response) => {
        const producerOptions = response.data.Producers.map((actor) => ({
          label: actor.name,
          value: actor._id,
        }));
        setOptions(producerOptions);
      })
      .catch((error) => {
        console.error("Error fetching producers:", error);
      });
  }, []);


  return (
    <Select
      className=" w-2/3 rounded-lg text-black"
      options={options}
      placeholder="Select producer..."
      onChange={onChange}
      value={producer}
      isSearchable
      isClearable
      
    />
  );
}

export default ProducersDropdown;
