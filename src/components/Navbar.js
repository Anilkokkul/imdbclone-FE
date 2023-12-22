import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [search, setSearch] = useState("");
  return (
    <div className=" flex items-center justify-between  w-screen bg-slate-900 text-center h-16 p-5 ">
      <img
        className=" w-16"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/863px-IMDB_Logo_2016.svg.png"
        alt=""
      />
      <div className=" w-96">
        <input
          value={search}
          type="text"
          className="w-full border-none h-9 p-1 rounded-md text-black"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className=" w-md-16">
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
}

export default Navbar;
