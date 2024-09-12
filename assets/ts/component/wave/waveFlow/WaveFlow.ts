import { Wave } from "../Wave";
export class WaveFlow extends Wave {
  private speed: number = 1;
  private color: string;
  private animationFrameId;
  constructor() {
    super();
    this.initialPathElement();
    this.startAnimation();
  }
  /* Initial関数 */
  public initialPathElement() {
    this.pathElement.setAttribute("fill", "none");
  }
  /* Update関数 */
  public update() {
    this.pathElement.setAttribute("stroke-width", `${this.lineWidth}`);
    this.pathElement.setAttribute("stroke", this.color);
  }
  /* Set関数 */
  /* 波のスピードをセット */
  public setSpeed(speed: number) {
    this.speed = speed;
  }
  /* 波の色をセット */
  public setColor(color: string) {
    this.color = color;
  }

  /* アニメーション関数 */
  /* idを利用してアニメーションを管理、currentTimeを使う */
  private startAnimation() {
    const animate = (currentTime: number) => {
      const path = this.generatePathData(currentTime);
      this.drawWave(path);
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
  /* 時間差をつかって波を描画 */
  public drawWave(path: string) {
    this.pathElement.setAttribute("d", path);
  }

  private generatePathData(currentTime): string {
    const pathData: string[] = [];
    const width = this.getWidth();
    pathData.push(`M 0 ${this.returnYPoint(0, currentTime)}`);
    const step = 1; // パスのセグメントのステップを増やすことでパフォーマンスを向上させる
    for (let x = step; x < width; x += step) {
      const y = this.returnYPoint(x, currentTime);
      pathData.push(`L ${x} ${y}`);
    }

    return pathData.join(" ");
  }
  /* 波の高さを返す関数　時間の情報を使って波をずらす */
  public returnYPoint(x: number, currentTime: number): number {
    const phase = this.frequency * Math.PI * 2 * (x / this.getWidth());
    const speedEffect = (-this.speed * currentTime) / 1000;
    const theta = phase + speedEffect + this.shift;
    const centerOffset = this.getHeight() / 2;
    return this.getAmplitude() * Math.sin(theta) + centerOffset;
  }
  /* 削除されたときの処理 */
  cleanUp() {
    this.stopAnimation();
  }
}
