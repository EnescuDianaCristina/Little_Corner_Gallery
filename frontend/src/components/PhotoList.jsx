import PhotoCard from "./PhotoCard.jsx";

// Primește lista de poze și returnează o copie sortată, cu cele favorite primele
function sorteazaPoze(listaPoze) {
  return [...listaPoze].sort((a, b) => Number(b.favorit) - Number(a.favorit));
}

// Afișează lista sortată de fotografii sau un mesaj dacă galeria este goală
export default function PhotoList({ poze, onToggleFavorit, onDelete }) {
  if (!poze || poze.length === 0) {
    return (
      <p className="empty" data-testid="empty">
        Nu există nicio fotografie.
      </p>
    );
  }

  const pozeSortate = sorteazaPoze(poze);

  return (
    <ul className="item-list">
      {pozeSortate.map((poza) => (
        <PhotoCard
          key={poza.id}
          poza={poza}
          onToggleFavorit={onToggleFavorit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}