import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="Sidebar">
      <ul className="actions">
        {/* <li>
          <button className="text-2xl font-bold leading-7 text-base-900 rounded-sm border-solid">
            <Link to="/">Home</Link>
          </button>
        </li> */}
        <li>
          <button className="text-2xl font-bold leading-7 text-base-900 rounded-sm">
            <Link to={"/"}>All Movies</Link>
          </button>
        </li>
        <li>
          <button className="text-2xl font-bold leading-7 text-base-900">
            <Link to={"/actors"}>All Actors</Link>
          </button>
        </li>
        <li>
          <button className="text-2xl font-bold leading-7 text-base-900">
            <Link to={"/producers"}>All Producers</Link>
          </button>
        </li>
        <li>
          <button className="text-2xl font-bold leading-7 text-base-900">
            <Link to={"/add-movie"}>Add new Movie</Link>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
