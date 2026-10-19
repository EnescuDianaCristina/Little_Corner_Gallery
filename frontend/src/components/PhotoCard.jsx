const ETICHETE_VIZIBILITATE = {
  Public: "Public",
  Private: "Privat",
  Shared: "Partajat"
};

export default function PhotoCard({ poza }) {
  const cardClassName = poza.favorit ? "item-card done" : "item-card";

  return (
    <li className={cardClassName}>
      <div>
        <h3>{poza.titlu}</h3>
        <span className={`badge badge-${poza.vizibilitate.toLowerCase()}`}>
          {ETICHETE_VIZIBILITATE[poza.vizibilitate] || poza.vizibilitate}
        </span>
      </div>
      <span className="status">{poza.favorit ? "Favorit" : "Activ"}</span>
    </li>
  );
}