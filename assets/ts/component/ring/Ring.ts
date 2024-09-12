const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
export class Ring {
  public readonly svg: SVGSVGElement;
  private duration: number = 0;
  private numRing: number = 0;
  private lineWidth: number = 0;
  private color: string = "#fff";
  private radius = 50;
  constructor() {
    this.svg = this.createSvg();
  }
  /* Update関数 */
  public update() {
    this.updateViewBox();
    this.updateNumRing();
    this.updateAnimationRings();
  }
  private updateNumRing() {
    this.increaseRing();
    this.decreaseRing();
  }
  private updateViewBox() {
    const halfBoxSize = this.radius + this.lineWidth;
    this.svg.setAttribute(
      "viewBox",
      `${-halfBoxSize} ${-halfBoxSize} ${halfBoxSize * 2} ${halfBoxSize * 2}`
    );
  }
  private updateAnimationRings() {
    for (let i = 0; i < this.numRing; i++) {
      const ellipse = this.svg.children[i] as SVGEllipseElement;
      const animateTransform = ellipse
        ?.getElementsByTagNameNS(SVG_NAMESPACE, "animateTransform")
        .item(0) as SVGAnimateElement;
      if (!ellipse && animateTransform) continue;
      const ratio = i / this.numRing;
      this.updateAnimationRing(ellipse, animateTransform, ratio);
    }
  }
  private updateAnimationRing(
    ellipse: SVGEllipseElement,
    animateTransform: SVGAnimateTransformElement,
    ratio: number
  ) {
    const r = this.radius * (1 - ratio / 8);
    const rx = r * 0.88;
    const ry = r;
    const opacity = 1 - ratio / 2;
    this.updateEllipses(ellipse, rx, ry, opacity);
    const durationSec = (1 - ratio / 2) * this.duration;
    const rotation = (1 - ratio) * 270;
    this.updateAnimateTransform(animateTransform, durationSec, rotation);
  }
  private updateEllipses(
    ellipse: SVGEllipseElement,
    rx: number,
    ry: number,
    opacity: number
  ) {
    ellipse.setAttribute("rx", `${rx}`);
    ellipse.setAttribute("ry", `${ry}`);
    ellipse.setAttribute("opacity", `${opacity}`);
    ellipse.setAttribute("stroke-width", `${this.lineWidth}`);
    ellipse.setAttribute("stroke", this.color);
  }

  private updateAnimateTransform(
    animateTransform: SVGAnimateTransformElement,
    durationSec: number,
    rotation: number
  ) {
    animateTransform.setAttribute("dur", `${durationSec}`);
    animateTransform.setAttribute("from", `${rotation} ${0} ${0}`);
    animateTransform.setAttribute("to", `${rotation + 360} ${0} ${0}`);
  }
  /* Create関数 */
  private createSvg() {
    const svg = document.createElementNS(SVG_NAMESPACE, "svg") as SVGSVGElement;
    return svg;
  }
  private createAnimationRing(): SVGEllipseElement {
    const ellipse = this.createEllipse();
    const animateTransform = this.createAnimateTransform();
    ellipse.appendChild(animateTransform);
    return ellipse;
  }
  private createEllipse(): SVGEllipseElement {
    const ellipse = document.createElementNS(
      SVG_NAMESPACE,
      "ellipse"
    ) as SVGEllipseElement;
    ellipse.setAttribute("cx", "0");
    ellipse.setAttribute("cy", "0");
    ellipse.setAttribute("rx", "0");
    ellipse.setAttribute("ry", "0");
    ellipse.setAttribute("stroke-width", "#fff");
    ellipse.setAttribute("stroke", "#fff");
    ellipse.setAttribute("opacity", "0");
    ellipse.setAttribute("fill", "none");
    return ellipse;
  }
  private createAnimateTransform(): SVGAnimateTransformElement {
    const animateTransform = document.createElementNS(
      SVG_NAMESPACE,
      "animateTransform"
    ) as SVGAnimateTransformElement;
    animateTransform.setAttribute("attributeName", "transform");
    animateTransform.setAttribute("type", "rotate");
    animateTransform.setAttribute("from", "0 0 0");
    animateTransform.setAttribute("to", "0 0 0");
    animateTransform.setAttribute("dur", "0");
    animateTransform.setAttribute("repeatCount", "indefinite");
    return animateTransform;
  }
  /* Set関数 */
  public setLineWidth(lineWidth: number) {
    this.lineWidth = lineWidth;
  }
  public setnumRing(numRing: number) {
    this.numRing = numRing;
  }
  public setColor(color: string) {
    this.color = color;
  }
  public setDuration(duration: number) {
    this.duration = duration;
  }
  /* その他関数 */
  increaseRing() {
    while (this.svg.childElementCount < this.numRing) {
      const animationRing: SVGEllipseElement = this.createAnimationRing();
      this.svg.appendChild(animationRing);
    }
  }
  decreaseRing() {
    while (this.svg.childElementCount > this.numRing) {
      this.svg.lastElementChild?.remove();
    }
  }
}
