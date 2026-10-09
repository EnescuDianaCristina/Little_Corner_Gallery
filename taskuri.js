const taskuri = [
  { id: 1, titlu: "Sunset_Beach.jpg", favorit: false, vizibilitate: "Public" },
  { id: 2, titlu: "Family_Portrait.png", favorit: true, vizibilitate: "Private" },
  { id: 3, titlu: "Project_Design.png", favorit: false, vizibilitate: "Shared" }
];
const VIZIBILITATI = ["Public", "Private", "Shared"];

function listeazaTitluri(lista) {
 return taskuri.map((p) => p.titlu);
}

function numaraActive(lista) {
    return lista.filter((p) => !p.favorit).length;
}

function cautaDupaTitlu(lista, text) {
  const cautat = text.toLowerCase();
  return lista.filter((p) => p.titlu.toLowerCase().includes(cautat));
}

function nextID(lista) {
        return lista.reduce((max, p) => Math.max(max, p.id), 0) + 1;
    }

function adaugaTask(lista, titlu, vizibilitate =  "Public") {
    const titluCurent = titlu.trim();
    if (!titluCurent) {
    console.log("Eroare: Titlul nu poate fi gol!");
    return lista;
    }
    if (!VIZIBILITATI.includes(vizibilitate)) {
    console.log(`Eroare: Vizibilitate invalidă '${vizibilitate}'!`);
    }
    const nouaTask = {
    id: nextID(lista),
    titlu: titluCurent,
    favorit: false,
    vizibilitate: vizibilitate
    };

    return [...lista, nouaTask];
}

function comutaFavorit(lista, id) {
  return lista.map((p) => {
    if (p.id === id) {
      return { ...p, favorit: !p.favorit };
    }
    return p;
  });
}

function stergeTask(lista, id) {
  return lista.filter((p) => p.id !== id);
}


console.log("--- Citire ---");
console.log("Titluri:", listeazaTitluri(taskuri).join(", "));
console.log("Active:", numaraActive(taskuri));
console.log("Căutare 'beach':", listeazaTitluri(cautaDupaTitlu(taskuri, "beach")).join(", "));

console.log("--- Adăugare ---");
let listaNoua = adaugaTask(taskuri, "Vacation_Photo.jpg", "Private");
console.log("Lista nouă:", listaNoua.length, "taskuri");
console.log("Originalul a rămas cu:", taskuri.length, "taskuri");

console.log("--- Modificare și ștergere ---");
listaNoua = comutaFavorit(listaNoua, 1);
console.log("După bifare id 1 ca favorit, active:", numaraActive(listaNoua));

listaNoua = stergeTask(listaNoua, 3);
console.log("După ștergerea id 3:", listeazaTitluri(listaNoua).join(", "));

console.log("--- Validare ---");
adaugaTask(listaNoua, "   ");
adaugaTask(listaNoua, "Poza.jpg", "Secret");