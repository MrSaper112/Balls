import { co_ordinates, ballInter } from "./const";

export class SingleBall implements ballInter {
  public color: String;
  public position: co_ordinates;
  public div: HTMLElement;
  public listenerExist: boolean;

  constructor(color: string, position?: co_ordinates) {
    this.color = color;
    this.position = position;
    this.div;
    this.listenerExist = false;
    this.init();
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }
  init() {
    this.div = document.createElement("figure");
    this.div.className = "circle";
    this.div.style.background =
      "radial-gradient(circle at 5px 5px, " + this.color + ", #000)";
  }
  getColor() {
    return this.color;
  }
  removeMe() {
    this.div.remove();
  }
  updatePosition(newPos: co_ordinates, boxAppend: HTMLDivElement) {
    this.makeMeSmall();
    let clone = this.div;
    this.div.remove();
    boxAppend.appendChild(clone);
    this.div = clone;
    this.position = newPos;
  }
  makeMeBig() {
    this.div.style.height = "45px";
    this.div.style.width = "45px";
  }
  makeMeSmall() {
    this.div.style.height = "35px";
    this.div.style.width = "35px";
  }
}
//#7209b7
