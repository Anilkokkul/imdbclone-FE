import React from "react";

function Card({ actor }) {
  return (
    <div className=" p-3 rounded-lg bg-slate-900 hover:scale-110 overflow-hidden">
      <h1 className=" text-center text-4xl font-bold mb-4">{actor.name}</h1>
      {actor.bio && <p>Bio : {actor.bio}</p>}
      {actor.movies.length > 0 ? (
        <ol>
          Movies:
          {actor.movies.map((movie) => (
            <li className="list-decimal ml-8" key={movie._id}>
              {movie.title}
            </li>
          ))}
        </ol>
      ) : (
        <div>
          Movies: <span className=" text-red-600">No Movies found</span>
        </div>
      )}
      <ul>
        {actor.gender && <li>Gender : {actor.gender}</li>}
        <li>Date of Birth: {actor.dob}</li>
      </ul>
    </div>
  );
}

export default Card;
