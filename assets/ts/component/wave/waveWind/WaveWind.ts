import { Wave } from "../Wave";
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
export class WaveWind extends Wave {
  private gradient: SVGLinearGradientElement;
  private defId: string = "gradient";
  private defs: SVGDefsElement;
  private mainColor: string;
  private fadeColor: string;
  private animationFrameId;

  constructor() {
    super();
    this.defs = this.createDefs();
    this.svg.appendChild(this.defs);
    this.initialPathElement();
    this.startAnimation();
  }
  /* Update関数 */
  public update() {
    this.pathElement.setAttribute("stroke-width", `${this.lineWidth}`);
    this.pathElement.setAttribute("d", this.generatePathData());
  }
  /* Initial関数 */
  public initialPathElement() {
    this.pathElement.setAttribute("stroke", `url(#${this.defId})`);
    this.pathElement.setAttribute("fill", "none");
  }
  /* Create関数 */
  private createDefs() {
    const defs = document.createElementNS(SVG_NAMESPACE, "defs");
    this.gradient = this.createLinearGradient();
    const stop1 = this.createSvgStopElement();
    const stop2 = this.createSvgStopElement();
    const stop3 = this.createSvgStopElement();
    this.gradient.appendChild(stop1);
    this.gradient.appendChild(stop2);
    this.gradient.appendChild(stop3);
    defs.appendChild(this.gradient);
    return defs;
  }
  private createLinearGradient(): SVGLinearGradientElement {
    const gradient = document.createElementNS(
      SVG_NAMESPACE,
      "linearGradient"
    ) as SVGLinearGradientElement;
    gradient.setAttribute("id", `${this.defId}`);
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "100%");
    gradient.setAttribute("y2", "0%");
    return gradient;
  }
  private createSvgStopElement(): SVGStopElement {
    const stop = document.createElementNS(SVG_NAMESPACE, "stop");
    stop.setAttribute("offset", "0%");
    return stop;
  }

  /* アニメーション関数 */
  /* idを利用してアニメーションを管理、currentTimeを使う */
  private startAnimation() {
    const animate = (currentTime: number) => {
      this.drawWind(currentTime);
      this.animationFrameId = requestAnimationFrame(animate);
    };
    this.animationFrameId = requestAnimationFrame(animate);
  }
  public stopAnimation() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private drawWind(currentTime: number) {
    const destination = this.getWidth();
    const time_s = currentTime / 1000;
    const lengthRatio = 0.5;
    const locationRatio =
      (((destination * time_s) / 8) % (destination * (1 + lengthRatio))) /
      destination;
    this.changeGradient(locationRatio, lengthRatio);
  }
  private changeGradient(locationRatio: number, lengthRatio: number) {
    const stops = this.gradient.querySelectorAll("stop");
    if (stops.length >= 3) {
      const locationFade1 = (locationRatio - lengthRatio) * 100;
      (stops[0] as SVGStopElement).setAttribute("offset", `${locationFade1}%`);
      (stops[0] as SVGStopElement).setAttribute("stop-color", this.fadeColor);
      const locationMain = (locationRatio - lengthRatio / 2) * 100;
      (stops[1] as SVGStopElement).setAttribute("offset", `${locationMain}%`);
      (stops[1] as SVGStopElement).setAttribute("stop-color", this.mainColor);
      const locationFade2 = locationRatio * 100;
      (stops[2] as SVGStopElement).setAttribute("offset", `${locationFade2}%`);
      (stops[2] as SVGStopElement).setAttribute("stop-color", this.fadeColor);
    }
  }
  private generatePathData(): string {
    const pathData: string[] = [];
    pathData.push(`M 0 ${this.returnYPoint(0)}`);
    const width = this.getWidth();
    for (let x = 1; x < width; x++) {
      const y = this.returnYPoint(x);
      pathData.push(`L ${x} ${y}`);
    }
    return pathData.join(" ");
  }
  /* 波の高さを返す関数 */
  public returnYPoint(x: number): number {
    const phase = Math.PI * 2 * this.frequency * (x / this.getWidth());
    const theta = phase + this.shift;
    const centerOffset = this.getHeight() / 2;
    return this.getAmplitude() * Math.sin(theta) + centerOffset;
  }
  /* 削除されたときの処理 */
  cleanUp() {
    this.stopAnimation();
  }
  /* Set関数 */
  public setMainColor(color: string) {
    this.mainColor = color;
  }
  public setFadeColor(color: string) {
    this.fadeColor = color;
  }
}
