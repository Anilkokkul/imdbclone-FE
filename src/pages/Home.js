import React from "react";
import Workspace from "../components/Workspace";
import Movies from "../components/Movies";

function Home() {
  return (
    <div>
      <Workspace>
        <Movies />
      </Workspace>
    </div>
  );
}

export default Home;
