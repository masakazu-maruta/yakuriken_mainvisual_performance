import { Ring } from "./Ring";
import { Color } from "../../util/color";
interface Transform {
  x: number;
  y: number;
}
export class RingElement extends HTMLElement {
  private ring: Ring;
  private styleElement: HTMLStyleElement;
  /* 属性値の種類 */
  static get observedAttributes() {
    return ["duration", "line-width", "number", "color"];
  }
  constructor() {
    super();
    this.ring = new Ring();
    this.styleElement = this.initialStyle();
  }
  /* カスタム要素専用関数 */
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(this.ring.svg);
    this.shadowRoot?.appendChild(this.styleElement);
    this.update();
  }
  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    this.update();
  }
  /* ユーザー関数 */

  private update() {
    const duration: number = this.getFloatAttribute("duration");
    const lineWidth: number = this.getFloatAttribute("line-width");
    const numberRing: number = this.getFloatAttribute("number");
    const color: string = this.getAttribute("color") ?? "#fff";
    this.ring.setDuration(duration);
    this.ring.setLineWidth(lineWidth);
    this.ring.setnumRing(numberRing);
    this.ring.setColor(color);
    this.ring.update();
  }
  /* 実数の属性をゲット */
  private getFloatAttribute(value: string): number {
    return parseFloat(this.getAttribute(value) || "0");
  }
  private initialStyle() {
    const style = document.createElement("style");
    style.textContent = `
    :host {
        position : absolute;
        display : block;
        overflow:hidden;
      }
    svg {
        display : block;
        height : 100%;
        width : 100%;
      }
          `;
    return style;
  }
}
