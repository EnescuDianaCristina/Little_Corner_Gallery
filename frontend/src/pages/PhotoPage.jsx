import { useEffect, useState } from "react";
import PhotoList from "../components/PhotoList.jsx";
import PhotoForm from "../components/PhotoForm.jsx";
import { createPoza, deletePoza, fetchPoze, updatePoza } from "../api.js";
import styles from "./PhotoPage.module.css";

export default function PhotoPage() {
  const [photo, setPhoto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await fetchPoze();
        if (!ignore) setPhoto(data);
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

  async function handleAdd(poza) {
    const creata = await createPoza(poza);
    setPhoto((prev) => [...prev, creata]);
  }

  async function handleToggleFavorit(id) {
    const curenta = photo.find((p) => p.id === id);
    try {
      const actualizata = await updatePoza(id, { favorit: !curenta.favorit });
      setPhoto((prev) => prev.map((p) => (p.id === id ? actualizata : p)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deletePoza(id);
      setPhoto((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const favoriteCount = photo.filter((p) => p.favorit).length;

  return (
    <div className={styles.grid}>
      <section className="panel">
        <h2>Adaugă fotografie</h2>
        <PhotoForm onAdd={handleAdd} />
      </section>

      <section className="panel">
        <h2>Galeria mea</h2>
        <p className={styles.summary}>
          {photo.length} poze, dintre care {favoriteCount} favorite
        </p>

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
            photo={photo}
            onToggleFavorit={handleToggleFavorit}
            onDelete={handleDelete}
          />
        )}
      </section>
    </div>
  );
}