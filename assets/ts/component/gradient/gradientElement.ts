import { Gradient } from "./Gradient";
export class GradientElement extends HTMLElement {
  private backGradient: Gradient;
  private styleElement: HTMLStyleElement;
  static get observedAttributes() {
    return [
      "color1",
      "color2",
      "color-animate-dur",
      "rx-animate-dur",
      "ry-animate-dur",
      "rx-animate-ratio",
      "ry-animate-ratio",
    ];
  }
  constructor() {
    super();
    this.backGradient = new Gradient();
    this.styleElement = this.createStyleElement();
  }
  /* カスタム要素専用関数 */
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(this.backGradient.svg);
    this.shadowRoot?.appendChild(this.styleElement);
    this.update();
  }
  disconnectedCallback() {
    if (!this.backGradient) return;
    this.backGradient.cleanUp();
  }
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    this.update();
  }
  /* ユーザー関数 */
  private update() {
    const color1: string = this.getAttribute("color1") ?? "#fff";
    const color2: string = this.getAttribute("color2") ?? "#fff";
    const colorAnimateDur: number = Number(this.getAttribute("color-animate-dur")) ?? 0;
    const rxAnimateDur: number = Number(this.getAttribute("rx-animate-dur")) ?? 0;
    const ryAnimateDur: number = Number(this.getAttribute("ry-animate-dur")) ?? 0;
    const rxAnimateRatio: number = Number(this.getAttribute("rx-animate-ratio")) ?? 0;
    const ryAnimateRatio: number = Number(this.getAttribute("ry-animate-ratio")) ?? 0;
    this.backGradient.setColor1(color1);
    this.backGradient.setColor2(color2);
    this.backGradient.setRxDurSecond(rxAnimateDur);
    this.backGradient.setRyDurSecond(ryAnimateDur);
    this.backGradient.setStopDurSecond(colorAnimateDur);
    this.backGradient.setRxRatio(rxAnimateRatio);
    this.backGradient.setRyRatio(ryAnimateRatio);
    this.backGradient.update();
  }
  private createStyleElement() {
    const style = document.createElement("style");
    style.textContent = `
    :host{
      position : absolute;
      display:block;
      }
      svg {
        filter : blur(9.6vw);
        height : 100%;
        width : 100%;
        }
        `;
    return style;
  }
}
