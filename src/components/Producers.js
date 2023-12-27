import React from "react";
import { useProducers } from "../context/produceContext";
import { useState } from "react";

import Card from "./Card";
import AddProducer from "./AddProducer";
function Producers() {
  const { producersData } = useProducers();
  const [model, setModel] = useState(false);

  const showModel = () => {
    setModel(!model);
  };
  return (
    <div className=" p-4">
      <h2 className="text-4xl  font-bold text-center my-3 heading">
        All Producers
      </h2>
      {producersData.length > 0 ? (
        <div>
          <hr className="w-full opacity-40" />
          <div
            className="text-center mx-auto p-3 rounded-2xl text-zinc-300 my-2 bg-slate-800 w-32"
            onClick={showModel}
          >
            Add Producer
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
            {producersData.map((producer, i) => {
              return <Card key={i} actor={producer} />;
            })}
          </div>
          {model && <AddProducer setModel={setModel} />}
        </div>
      ) : (
        <div className=" md:text-7xl text-center mt-40 flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
}

export default Producers;
