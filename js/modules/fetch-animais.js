import AnimaNumeros from "./anima-numeros.js";

export default function fetchAnimais(url, target) {
  // cria a div com as informações dos animais
  function createAnimal(animal) {
    const div = document.createElement("div");
    div.classList.add("numero-animal");
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }
  // preenche os animais no DOM
  function preencherAnimais(animal) {
    const numerosGrid = document.querySelector(target);
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }
  // anima os números
  function animaAnimaisNumeros() {
    const animaNumeros = new AnimaNumeros("[data-numero]", ".numeros", "ativo");
    animaNumeros.init();
  }

  // puxa as informções do arquivo JSON
  async function criarAnimais() {
    try {
      // espera a resposta do fetch
      const animaisResponse = await fetch(url);
      // transforma a resposta em JSON
      const animaisJSON = await animaisResponse.json();
      // puxa o nome e quantidade de cada animal
      animaisJSON.forEach((animal) => preencherAnimais(animal));
      animaAnimaisNumeros();
    } catch (erro) {
      console.log(erro);
    }
  }
  return criarAnimais();
}
