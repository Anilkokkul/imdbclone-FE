import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Workspace({ children }) {
  return (
    <div className="flex flex-col w-full border-opacity-50 h-screen">
      <div className="grid h-20 card rounded-box place-items-center">
        <Navbar />
      </div>
      <div className="flex flex-nowrap rounded-box place-items-center h-screen">
        <div className="grid flex-grow h-full w-1/6">
          <Sidebar />
        </div>
        <div className="grid h-full w-5/6 m-1">{children}</div>
      </div>
    </div>
  );
}

export default Workspace;
