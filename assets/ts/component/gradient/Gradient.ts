const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
export class Gradient {
  public readonly svg: SVGSVGElement;
  private ellipse: SVGEllipseElement;
  private def: SVGGElement;
  private defId: string;
  private linearGradient: SVGLinearGradientElement;
  private stop1: SVGStopElement;
  private stop2: SVGStopElement;
  private stopAnimate1: SVGAnimateElement;
  private stopAnimate2: SVGAnimateElement;
  private stopDurSecond: number;
  private ryAnimate: SVGAnimateElement;
  private rxAnimate: SVGAnimateElement;
  private ryDurSecond: number;
  private rxDurSecond: number;
  private ryRatio: number;
  private rxRatio: number;
  private color1: string;
  private color2: string;
  constructor() {
    this.defId = "bg-grad";
    this.svg = this.createSvg();
    this.initialCreateElements();
    this.initialAppendChild();
    this.initialAddEvents();
  }
  /* 最適化関数 */
  public optimizeSVGSize() {
    const rx = this.getWidth() / 2;
    const ry = this.getHeight() / 2;
    this.svg.setAttribute("viewBox", `${-rx} ${-ry} ${rx * 2} ${ry * 2}`);
    this.ellipse.setAttribute("rx", `${rx}`);
    this.ellipse.setAttribute("ry", `${ry}`);
    this.rxAnimate.setAttribute("values", `${rx};${rx * this.rxRatio};${rx}`);
    this.ryAnimate.setAttribute("values", `${ry};${ry * this.ryRatio};${ry}`);
  }
  /* Update関数 */
  public update() {
    this.updateStopAnimate();
    this.updateRxAnimate();
    this.updateRyAnimate();
  }

  private updateStopAnimate() {
    this.stopAnimate1.setAttribute("values", `${this.color1};${this.color2};${this.color1}`);
    this.stopAnimate1.setAttribute("dur", `${this.stopDurSecond}s`);
    this.stopAnimate2.setAttribute("values", `${this.color2};${this.color1};${this.color2}`);
    this.stopAnimate2.setAttribute("dur", `${this.stopDurSecond}s`);
  }
  private updateRxAnimate() {
    const rx = this.getWidth() / 2;
    this.rxAnimate.setAttribute("values", `${rx};${rx * this.rxRatio};${rx}`);
    this.rxAnimate.setAttribute("dur", `${this.rxDurSecond}s`);
  }
  private updateRyAnimate() {
    const ry = this.getHeight() / 2;
    this.ryAnimate.setAttribute("values", `${ry};${ry * this.ryRatio};${ry}`);
    this.ryAnimate.setAttribute("dur", `${this.ryDurSecond}s`);
  }
  /* Initial関数 */
  private initialCreateElements() {
    this.ellipse = this.createEllipse();
    this.def = this.createDef();
    this.rxAnimate = this.createEllipseAnimationRx();
    this.ryAnimate = this.createEllipseAnimationRy();
    this.linearGradient = this.createLinearGradient();
    this.stop1 = this.createStop("0%");
    this.stop2 = this.createStop("100%");
    this.stopAnimate1 = this.createStopAnimation(this.stopDurSecond, this.color1, this.color2);
    this.stopAnimate2 = this.createStopAnimation(this.stopDurSecond, this.color2, this.color1);
  }
  private initialAppendChild() {
    this.svg.appendChild(this.ellipse);
    this.ellipse.appendChild(this.rxAnimate);
    this.ellipse.appendChild(this.ryAnimate);
    this.svg.appendChild(this.def);
    this.def.appendChild(this.linearGradient);
    this.linearGradient.appendChild(this.stop1);
    this.linearGradient.appendChild(this.stop2);
    this.stop1.appendChild(this.stopAnimate1);
    this.stop2.appendChild(this.stopAnimate2);
  }
  private initialAddEvents() {
    window.addEventListener("load", () => this.optimizeSVGSize());
    window.addEventListener("resize", () => this.optimizeSVGSize());
  }
  /* Create関数 */
  /* svgはdef,ellipseを持つ */
  private createSvg(): SVGSVGElement {
    const svg = document.createElementNS(SVG_NAMESPACE, "svg") as SVGSVGElement;
    svg.setAttribute("xmlns", SVG_NAMESPACE);
    return svg;
  }
  private createEllipse(): SVGEllipseElement {
    const ellipse = document.createElementNS(SVG_NAMESPACE, "ellipse") as SVGEllipseElement;
    ellipse.setAttribute("fill", `url(#${this.defId})`);
    return ellipse;
  }
  private createEllipseAnimationRx(): SVGAnimateElement {
    // 水平半径のアニメーション
    const animateRx = document.createElementNS(SVG_NAMESPACE, "animate");
    animateRx.setAttribute("attributeName", "rx");
    animateRx.setAttribute("repeatCount", "indefinite");
    return animateRx;
  }
  private createEllipseAnimationRy(): SVGAnimateElement {
    // 垂直半径のアニメーション
    const animateRy = document.createElementNS(SVG_NAMESPACE, "animate");
    animateRy.setAttribute("attributeName", "ry");
    animateRy.setAttribute("repeatCount", "indefinite");
    return animateRy;
  }
  /* defに着ける子はlinerGradient */
  private createDef(): SVGGElement {
    return document.createElementNS(SVG_NAMESPACE, "defs");
  }
  /* ストップを子に持つ */
  private createLinearGradient(): SVGLinearGradientElement {
    const linearGradient = document.createElementNS(SVG_NAMESPACE, "linearGradient");
    linearGradient.setAttribute("id", this.defId);
    linearGradient.setAttribute("x1", "0%");
    linearGradient.setAttribute("y1", "0%");
    linearGradient.setAttribute("x2", "100%");
    linearGradient.setAttribute("y2", "100%");
    return linearGradient;
  }
  private createStop(offset: string): SVGStopElement {
    const stop: SVGStopElement = document.createElementNS(SVG_NAMESPACE, "stop");
    stop.setAttribute("offset", offset);
    return stop;
  }
  private createStopAnimation(durSecond: number, color1: string, color2: string): SVGAnimateElement {
    const animate = document.createElementNS(SVG_NAMESPACE, "animate");
    animate.setAttribute("attributeName", "stop-color");
    animate.setAttribute("repeatCount", "indefinite");
    return animate;
  }
  /* Get関数 */
  /* １未満であれば、１を返す(除算に使うため) */
  public getWidth(): number {
    return this.svg.clientWidth > 1 ? this.svg.clientWidth : 1;
  }
  /* １未満であれば、１を返す(除算に使うため) */
  public getHeight(): number {
    return this.svg.clientHeight > 1 ? this.svg.clientHeight : 1;
  }
  /* Set関数 */
  public setColor1(color: string) {
    this.color1 = color;
  }
  public setColor2(color: string) {
    this.color2 = color;
  }
  public setStopDurSecond(dur: number) {
    this.stopDurSecond = dur;
  }
  public setRyDurSecond(dur: number) {
    this.ryDurSecond = dur;
  }
  public setRxDurSecond(dur: number) {
    this.rxDurSecond = dur;
  }
  public setRyRatio(ratio: number) {
    this.ryRatio = ratio;
  }
  public setRxRatio(ratio: number) {
    this.rxRatio = ratio;
  }
  /* 削除されたときの処理 */
  public cleanUp() {
    this.svg.removeEventListener("load", () => this.optimizeSVGSize());
    this.svg.removeEventListener("resize", () => this.optimizeSVGSize());
  }
}
