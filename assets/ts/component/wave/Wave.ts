const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
export class Wave {
  public readonly svg: SVGSVGElement;
  protected lineWidth: number;
  protected pathElement: SVGPathElement;
  protected frequency: number;
  protected shift: number;

  constructor() {
    this.svg = this.createSvgElement();
    this.pathElement = this.createPathElement();
    this.svg.appendChild(this.pathElement);
  }

  /* Create関数 */
  private createSvgElement() {
    const svg = document.createElementNS(SVG_NAMESPACE, "svg");
    return svg;
  }
  private createPathElement() {
    const pathElement = document.createElementNS(SVG_NAMESPACE, "path");
    return pathElement;
  }
  /* Get関数 */
  /* １未満であれば、１を返す(除算に使うため) */
  public getHeight() {
    return this.svg.clientHeight > 1 ? this.svg.clientHeight : 1;
  }
  /* １未満であれば、１を返す(除算に使うため) */
  public getWidth() {
    return this.svg.clientWidth > 1 ? this.svg.clientWidth : 1;
  }
  /* 波の線の真ん中をTransformOriginとするので、高さの半分から線の太さの半分を引く */
  public getAmplitude(): number {
    return this.svg.clientHeight / 2 - this.lineWidth / 2 - 1;
  }
  /* Set関数 */
  /* 周波数をセット　画面に現れる周期の数 */
  public setFrequency(frequency: number) {
    this.frequency = frequency;
  }
  /* 波のズレをセット */
  public setShift(shift: number) {
    this.shift = shift;
  }
  /* 波の線の太さをセット */
  public setLineWidth(lineWidth: number) {
    this.lineWidth = lineWidth;
  }
}
