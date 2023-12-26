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
      <div>
        <button className=" bg-yellow-400 hover:bg-yellow-300 font-bold py-1 px-4 rounded text-black">
          <Link to={"/login"}>Login</Link>
        </button>
        <button className=" bg-yellow-400 hover:bg-yellow-300 font-bold py-1 px-4 rounded text-black ml-2">
          <Link to={"/register"}>Sign Up</Link>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
