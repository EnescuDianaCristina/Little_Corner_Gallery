import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPoza } from "../api.js";
import { ETICHETE_VIZIBILITATE } from "../constants.js";
import styles from "./PhotoDescriptionPage.module.css";

export default function PhotoDescriptionPage() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetchPoza(id)
      .then((data) => {
        if (!ignore) {
          setPhoto(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Se încarcă...
      </p>
    );
  }

  if (error) {
    return (
      <section className="panel">
        <p className="error" data-testid="error">
          Fotografia nu a putut fi încărcată: {error}
        </p>
        <Link to="/">Înapoi la galerie</Link>
      </section>
    );
  }

  return (
    <section className={`panel ${styles.detail}`} data-testid="detail">
      <Link to="/" className={styles.back}>
        Înapoi la galerie
      </Link>
      <h2 data-testid="detail-title">{photo.titlu}</h2>
      <dl className={styles.fields}>
        <dt>Vizibilitate</dt>
        <dd>
          <span className={`badge badge-${photo.vizibilitate.toLowerCase()}`}>
            {ETICHETE_VIZIBILITATE[photo.vizibilitate] || photo.vizibilitate}
          </span>
        </dd>
        <dt>Status</dt>
        <dd>{photo.favorit ? "Favorită ♥" : "Standard"}</dd>
        <dt>ID</dt>
        <dd>{photo.id}</dd>
        {photo.descriere && (
          <>
            <dt>Descriere</dt>
            <dd>{photo.descriere}</dd>
          </>
        )}
      </dl>
    </section>
  );
}