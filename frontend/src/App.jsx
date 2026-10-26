import { useState } from "react";
import PhotoList from "./components/PhotoList.jsx";

const POZE_INITIALE = [
  { id: 1, titlu: "Sunset_Beach.jpg", favorit: false, vizibilitate: "Public" },
  { id: 2, titlu: "Family_Portrait.png", favorit: true, vizibilitate: "Private" },
  { id: 3, titlu: "Project_Design.png", favorit: false, vizibilitate: "Shared" }
];

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [poze, setPoze] = useState(POZE_INITIALE);
  const [tema, setTema] = useState(temaInitiala);

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
        {/* Butonul de comutare a temei din colț */}
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
          {/* Transmiterea datelor și a funcțiilor prin props către PhotoList */}
          <PhotoList
            poze={poze}
            onToggleFavorit={handleToggleFavorit}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </>
  );
}