import PhotoList from "./components/PhotoList.jsx";

const poze = [
  { id: 1, titlu: "Sunset_Beach.jpg", favorit: false, vizibilitate: "Public" },
  { id: 2, titlu: "Family_Portrait.png", favorit: true, vizibilitate: "Private" },
  { id: 3, titlu: "Project_Design.png", favorit: false, vizibilitate: "Shared" }
];

export default function App() {
  const active = poze.filter((p) => !p.favorit).length;

  return (
    <>
      <header className="app-header">
        <h1>Photo Gallery</h1>
        <p>Aplicație pentru gestionarea și organizarea galeriei personale.</p>
        <p className="app-count">
          {poze.length} poze, dintre care {active} active
        </p>
      </header>

      <main className="container">
        <section className="panel">
          <h2>My Gallery</h2>
          {/* Afișarea listei dinamice de poze transmise ca props */}
          <PhotoList poze={poze} />
        </section>
      </main>
    </>
  );
}