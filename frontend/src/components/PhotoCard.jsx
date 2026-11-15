const ETICHETE_VIZIBILITATE = {
  Public: "Public",
  Private: "Private",
  Shared: "Shared"
};

export default function PhotoCard({ poza, onToggleFavorit, onDelete }) {
  const cardClassName = poza.favorit ? "item-card done" : "item-card";

  return (
    <li className={cardClassName} data-testid="item" data-id={poza.id}>
      <label className="task-main">
        <input
          type="checkbox"
          className="fav-checkbox"
          checked={poza.favorit}
          onChange={() => onToggleFavorit(poza.id)}
          data-testid="item-toggle"
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