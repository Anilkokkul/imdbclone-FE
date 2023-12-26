import React from "react";
import { useMovies } from "../context/allMoviesContext";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Movies() {
  const { moviesData } = useMovies();

  const navigate = useNavigate();

  return (
    <div className=" p-4">
      <h2 className="text-4xl  font-bold text-center my-3 heading">
        All Movies
      </h2>
      {moviesData.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
            {moviesData.map((movie) => {
              return (
                <div
                  key={movie._id}
                  className="flex flex-col rounded-lg shadow-md overflow-hidden p-3 bg-slate-900 hover:scale-110 relative "
                >
                  <div className=" lg:text-3xl font-extrabold tracking-wider ">
                    {movie.title}
                  </div>
                  <p className=" text-slate-400">{movie.genre}</p>
                  <div>Year : {movie.yearOfRelease}</div>
                  <p className="mt-2 opacity-50">{movie.plot}</p>
                  <div className="font-extrabold tracking-widest mt-2">
                    Producer
                  </div>
                  <p>{movie.producer.name && movie.producer.name}</p>
                  <div className="font-extrabold tracking-widest mt-2">
                    Starring
                  </div>
                  <p>
                    {movie.actors.map((actor, i) => {
                      return (
                        <span key={i} className="text-slate-100 tracking-wide">
                          {actor.name && actor.name},
                        </span>
                      );
                    })}
                  </p>

                  <div className="group">
                    <button
                      onClick={() => navigate(`/edit/${movie._id}`)}
                      className=" w-8 h-9 p-1 text-slate-50 cursor-pointer group  absolute bottom-0 right-0 m-2 hover:scale-125  block"
                    >
                      <FaRegEdit className="w-full h-full" />
                    </button>
                    <span className="absolute font-extrabold z-10 right-[0px] bottom-11 scale-0 transition-all rounded-3xl bg-yellow-400 p-2  text-black group-hover:scale-100">
                      Edit Movie
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className=" md:text-7xl text-center mt-40">Loading...</div>
      )}
    </div>
  );
}

export default Movies;
