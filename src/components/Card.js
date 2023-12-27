import React from "react";

function Card({ actor }) {
  const formatDate = (isoDateString) => {
    const dateObject = new Date(isoDateString);
    const year = dateObject.getFullYear();
    const month = dateObject.toLocaleString("default", { month: "long" });
    const day = dateObject.getDate();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="transition duration-400 ease-in-out p-3 rounded-lg m-2 bg-slate-900 hover:scale-110">
      <h1 className=" text-center text-4xl font-bold mb-4">{actor.name}</h1>
      {actor.bio && <p className=" opacity-70"> {actor.bio}</p>}
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
        <li>Date of Birth: {formatDate(actor.dob)}</li>
      </ul>
    </div>
  );
}

export default Card;
