const ETICHETE_VIZIBILITATE = {
  Public: "Public",
  Private: "Privat",
  Shared: "Partajat"
};

export default function PhotoCard({ poza, onToggleFavorit, onDelete }) {
  const cardClassName = poza.favorit ? "item-card done" : "item-card";

  return (
    <li className={cardClassName}>
      <label className="task-main">
        <input
          type="checkbox"
          checked={poza.favorit}
          onChange={() => onToggleFavorit(poza.id)}
        />
        <div>
          <h3>{poza.titlu}</h3>
          <span className={`badge badge-${poza.vizibilitate.toLowerCase()}`}>
            {ETICHETE_VIZIBILITATE[poza.vizibilitate] || poza.vizibilitate}
          </span>
        </div>
      </label>

      <button
        className="btn-danger"
        onClick={() => onDelete(poza.id)}
        aria-label={`Șterge ${poza.titlu}`}
      >
        Șterge
      </button>
    </li>
  );
}