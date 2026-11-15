import { useEffect, useState } from "react";
import PhotoList from "./components/PhotoList.jsx";
import PhotoForm from "./components/PhotoForm.jsx";
import { createPoza, deletePoza, fetchPoze, updatePoza } from "./api.js";

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [poze, setPoze] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tema, setTema] = useState(temaInitiala);

  // Încărcarea datelor de la API prin useEffect
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

  // Întâi serverul, apoi state-ul (fără try/catch aici, ca eroarea să ajungă în PhotoForm)
  async function handleAdd(poza) {
    const creata = await createPoza(poza);
    setPoze((prev) => [...prev, creata]);
  }

  async function handleToggleFavorit(id) {
    const poza = poze.find((p) => p.id === id);
    try {
      const actualizata = await updatePoza(id, { favorit: !poza.favorit });
      setPoze((prev) => prev.map((p) => (p.id === id ? actualizata : p)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deletePoza(id);
      setPoze((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
    }
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
          <h2>Adaugă fotografie</h2>
          <PhotoForm onAdd={handleAdd} />
        </section>

        <section className="panel">
          <h2>My Gallery</h2>

          {loading && (
            <p className="info" data-testid="loading">
              Se încarcă...
            </p>
          )}

          {error && (
            <p className="error" data-testid="error">
              {error}
            </p>
          )}

          {!loading && (
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