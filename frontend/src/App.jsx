import { useEffect, useState } from "react";
import PhotoList from "./components/PhotoList.jsx";
import { fetchPoze } from "./api.js";

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [poze, setPoze] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tema, setTema] = useState(temaInitiala);

  // Incarcarea datelor de la API prin useEffect
  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await fetchPoze();
        if (!ignore) setPoze(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  function handleToggleFavorit(id) {
    setPoze((prev) =>
      prev.map((p) => (p.id === id ? { ...p, favorit: !p.favorit } : p))
    );
  }

  function handleDelete(id) {
    setPoze((prev) => prev.filter((p) => p.id !== id));
  }

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  const active = poze.filter((p) => !p.favorit).length;

  return (
    <>
      <header className="app-header">
        <button
          className="theme-toggle"
          onClick={handleTema}
          aria-pressed={tema === "dark"}
        >
          {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>

        <h1>Photo Gallery</h1>
        <p>Aplicație pentru gestionarea și organizarea galeriei personale.</p>
        <p className="app-count">
          {poze.length} poze, dintre care {active} active
        </p>
      </header>

      <main className="container">
        <section className="panel">
          <h2>My Gallery</h2>

          {loading && <p className="info">Se încarcă...</p>}

          {error && (
            <p className="error">
              Nu am putut încărca datele: {error}. Rulează <code>npm run api</code>?
            </p>
          )}

          {!loading && !error && (
            <PhotoList
              poze={poze}
              onToggleFavorit={handleToggleFavorit}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </>
  );
}