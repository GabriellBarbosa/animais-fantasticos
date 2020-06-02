import debounce from "./debounce.js";

export default class ScrollAnima {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.windowMetade = window.innerHeight * 0.6;
    // bind
    this.checkDistance = debounce(this.checkDistance.bind(this), 50);
  }
  // pega a distância do elemento para
  // o topo
  getDistance() {
    this.distance = [...this.sections].map((section) => {
      const offset = section.offsetTop;
      return {
        element: section,
        offset: offset - this.windowMetade,
      };
    });
  }
  // vê a distância do elemento para o topo
  // em tempo real
  checkDistance() {
    this.distance.forEach((item) => {
      if (window.pageYOffset > item.offset) {
        item.element.classList.add("ativo");
      } else if (item.element.classList.contains("ativo")) {
        item.element.classList.remove("ativo");
      }
    });
  }
  // inicia as funções
  init() {
    if (this.sections.length) {
      this.getDistance();
      this.checkDistance();
      window.addEventListener("scroll", this.checkDistance);
    }
    return this;
  }
  // remove o scroll-anima
  stop() {
    window.removeEventListener("scroll", this.checkDistance);
  }
}
