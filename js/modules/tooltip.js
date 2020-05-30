export default class Tooltip {
  constructor(tooltips) {
    this.tooltips = document.querySelectorAll(tooltips);

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }
  // move a tooltip de acordo com a posição do mouse
  // e o container da imagem
  onMouseMove(event) {
    this.tooltipBox.style.top = `${event.pageY + 20}px`;
    if (event.pageX > window.innerWidth - 260) {
      this.tooltipBox.style.left = `${event.pageX - 200}px`;
    } else {
      this.tooltipBox.style.left = `${event.pageX + 20}px`;
    }
  }
  // remove os eventos quando o mouse
  // sai de cima da imagem
  onMouseLeave({ currentTarget }) {
    this.tooltipBox.remove();
    currentTarget.removeEventListener("mouseleave", this.onMouseLeave);
    currentTarget.removeEventListener("mousemove", this.onMouseMove);
  }
  // Cria a tooltipbox
  criarTooltipBox(element) {
    const tooltipBox = document.createElement("div");
    const text = element.getAttribute("aria-label");
    tooltipBox.classList.add("tooltip");
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
    this.tooltipBox = tooltipBox;
  }
  // adiciona os eventos
  // onMouseMove e onMouseLeave
  onMouseOver({ currentTarget }) {
    // cria a tooltipBox e a coloca em uma propriedade
    this.criarTooltipBox(currentTarget);
    currentTarget.addEventListener("mousemove", this.onMouseMove);
    currentTarget.addEventListener("mouseleave", this.onMouseLeave);
  }
  // adiciona o evento on mouse over
  // para cada tooltip
  addTooltipsEvents() {
    this.tooltips.forEach((item) => {
      item.addEventListener("mouseover", this.onMouseOver);
    });
  }
  // inicia todas as funções
  init() {
    if (this.tooltips.length) {
      this.addTooltipsEvents();
    }
    return this;
  }
}
