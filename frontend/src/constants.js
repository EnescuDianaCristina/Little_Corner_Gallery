export const OPTIUNI_VIZIBILITATE = [
  { value: "Public", label: "Public" },
  { value: "Private", label: "Privat" },
  { value: "Shared", label: "Shared" },
];

export const ETICHETE_VIZIBILITATE = Object.fromEntries(
  OPTIUNI_VIZIBILITATE.map((opt) => [opt.value, opt.label])
);