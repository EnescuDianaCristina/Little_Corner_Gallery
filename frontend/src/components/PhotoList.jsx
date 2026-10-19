import PhotoCard from "./PhotoCard.jsx";

export default function PhotoList({ poze }) {
  // 1. Verificare pentru lista goala
  if (!poze || poze.length === 0) {
    return <p className="empty">Nu există nicio fotografie în galerie.</p>;
  }

  // 2. Randarea cardurilor din array folosind .map
  return (
    <ul className="item-list">
      {poze.map((poza) => (
        <PhotoCard key={poza.id} poza={poza} />
      ))}
    </ul>
  );
}