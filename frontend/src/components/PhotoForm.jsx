import { useState } from "react";

const OPTIUNI_VIZIBILITATE = [
  { value: "Public", label: "Public" },
  { value: "Private", label: "Privat" },
  { value: "Shared", label: "Partajat" },
];

const TITLU_MAX = 100;

export default function PhotoForm({ onAdd }) {
  const [titlu, setTitlu] = useState("");
  const [vizibilitate, setVizibilitate] = useState("Public");
  const [eroare, setEroare] = useState("");
  const [trimite, setTrimite] = useState(false);

  function valideaza() {
    const t = titlu.trim();
    if (t === "") return "Titlul este obligatoriu.";
    if (t.length > TITLU_MAX) return `Titlul are maximum ${TITLU_MAX} de caractere.`;
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const mesaj = valideaza();
    if (mesaj) {
      setEroare(mesaj);
      return;
    }

    setEroare("");
    setTrimite(true);

    try {
      await onAdd({ titlu: titlu.trim(), vizibilitate, favorit: false });
      setTitlu("");
      setVizibilitate("Public");
    } catch (err) {
      setEroare(err.message);
    } finally {
      setTrimite(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate data-testid="form">
      <label>
        Titlu
        <input
          type="text"
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          placeholder="Ex: Sunset_Beach.jpg"
          maxLength={TITLU_MAX}
          aria-invalid={Boolean(eroare)}
          data-testid="form-title"
        />
      </label>

      <label>
        Vizibilitate
        <select
          value={vizibilitate}
          onChange={(e) => setVizibilitate(e.target.value)}
          data-testid="form-vizibilitate"
        >
          {OPTIUNI_VIZIBILITATE.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      {eroare && (
        <p className="error" data-testid="form-error">
          {eroare}
        </p>
      )}

      <button type="submit" disabled={trimite} data-testid="form-submit">
        {trimite ? "Se salvează..." : "Adaugă"}
      </button>
    </form>
  );
}