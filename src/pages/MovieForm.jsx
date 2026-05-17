import { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";

function MovieForm() {
  const { id } = useParams();
  const { director, directors, setDirectors } = useOutletContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [genres, setGenres] = useState("");

  if (!director) return <h2>Director not found</h2>;

  function handleSubmit(e) {
    e.preventDefault();

    const newMovie = {
      id: crypto.randomUUID(),
      title,
      time: Number(time),
      genres: genres.split(",").map((g) => g.trim()),
    };

    fetch(`http://localhost:4000/directors/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movies: [...director.movies, newMovie],
      }),
    })
      .then((r) => r.json())
      .then((updated) => {
        const updatedList = directors.map((d) =>
          d.id === id ? updated : d
        );

        setDirectors(updatedList);

        navigate(`/directors/${id}/movies/${newMovie.id}`);
      });
  }

  return (
    <div>
      <h2>Add New Movie</h2>

      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <input value={time} onChange={(e) => setTime(e.target.value)} />
        <input value={genres} onChange={(e) => setGenres(e.target.value)} />
        <button>Add Movie</button>
      </form>
    </div>
  );
}

export default MovieForm;