import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function DirectorContainer() {
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/directors")
      .then((r) => r.json())
      .then(setDirectors);
  }, []);

  return (
    <div>
      <h1>Directors</h1>
      <Outlet context={{ directors, setDirectors }} />
    </div>
  );
}

export default DirectorContainer;