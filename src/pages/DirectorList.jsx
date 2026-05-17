import { useOutletContext, Link } from "react-router-dom";

function DirectorList() {
  const { directors } = useOutletContext();

  return (
    <ul>
      {directors.map((d) => (
        <li key={d.id}>
          <Link to={`/directors/${d.id}`}>{d.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default DirectorList;