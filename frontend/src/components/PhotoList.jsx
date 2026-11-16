import PhotoCard from "./PhotoCard.jsx";
import styles from "./PhotoList.module.css";

function PhotoSort(Photolist) {
  return [...Photolist].sort((a, b) => Number(b.favorit) - Number(a.favorit));
}

export default function PhotoList({ photo, onToggleFavorit, onDelete }) {
  if (!photo || photo.length === 0) {
    return (
      <p className="empty" data-testid="empty">
        Nu există nicio fotografie.
      </p>
    );
  }

  const pozeSortate = PhotoSort(photo);

  return (
    <ul className={styles.list}>
      {pozeSortate.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          onToggleFavorit={onToggleFavorit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}