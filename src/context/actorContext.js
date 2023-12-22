import { createContext, useContext, useState, useEffect } from "react";
import { instance } from "../App";

const actorContext = createContext({ actorsData: [] });

export const useActors = () => useContext(actorContext);

const ActorContextProvider = ({ children }) => {
  const [actorsData, setActorsData] = useState([]);

  useEffect(() => {
    instance
      .get("/actor")
      .then((data) => {
        setActorsData(data.data.Actors);
      })
      .catch((data) => {
        console.log("Error", data);
      });
  }, []);

  return (
    <actorContext.Provider value={{ actorsData, setActorsData }}>
      {children}
    </actorContext.Provider>
  );
};

export default ActorContextProvider;
