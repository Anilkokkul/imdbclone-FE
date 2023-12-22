import { createContext, useContext, useState, useEffect } from "react";
import { instance } from "../App";

const movieContext = createContext({ moviesData: [] });

export const useMovies = () => useContext(movieContext);

const MovieContextProvider = ({ children }) => {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    instance
      .get("/movie/all")
      .then((data) => {
        setMoviesData(data.data.movies);
      })
      .catch((data) => {
        console.log("Error", data);
      });
  }, []);

  return (
    <movieContext.Provider value={{ moviesData, setMoviesData }}>
      {children}
    </movieContext.Provider>
  );
};

export default MovieContextProvider;
