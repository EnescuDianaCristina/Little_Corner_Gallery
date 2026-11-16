import { Link } from "react-router-dom";
import { ETICHETE_VIZIBILITATE } from "../constants.js";
import styles from "./PhotoCard.module.css";

export default function PhotoCard({ photo, onToggleFavorit, onDelete }) {
  const cardClassName = photo.favorit
    ? `${styles.card} ${styles.done}`
    : styles.card;

  return (
    <li className={cardClassName} data-testid="item" data-id={photo.id}>
      <div className={styles.main}>
        <input
          type="checkbox"
          className={styles.favCheckbox}
          checked={photo.favorit}
          onChange={() => onToggleFavorit(photo.id)}
          aria-label={`Marchează ${photo.titlu} ca favorit`}
          data-testid="item-toggle"
        />
        <div>
          <Link
            to={`/poze/${photo.id}`}
            className={styles.title}
            data-testid="item-link"
          >
            {photo.titlu}
          </Link>
          <span className={`badge badge-${photo.vizibilitate.toLowerCase()}`}>
            {ETICHETE_VIZIBILITATE[photo.vizibilitate] || photo.vizibilitate}
          </span>
        </div>
      </div>

      <button
        className="btn-danger"
        onClick={() => onDelete(photo.id)}
        aria-label={`Șterge ${photo.titlu}`}
        data-testid="item-delete"
      >
        Șterge
      </button>
    </li>
  );
}