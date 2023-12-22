import { createContext, useContext, useState, useEffect } from "react";
import { instance } from "../App";

const producerContext = createContext({ producersData: [] });

export const useProducers = () => useContext(producerContext);

const ProducerContextProvider = ({ children }) => {
  const [producersData, setProducersData] = useState([]);

  useEffect(() => {
    fetchProducer();
  }, []);
  function fetchProducer() {
    instance
      .get("/producer")
      .then((data) => {
        // console.log("fetched data", data.data);
        setProducersData(data.data.Producers);
      })
      .catch((data) => {
        console.log("Error", data);
      });
  }
  return (
    <producerContext.Provider
      value={{ producersData, setProducersData, fetchProducer }}
    >
      {children}
    </producerContext.Provider>
  );
};

export default ProducerContextProvider;
