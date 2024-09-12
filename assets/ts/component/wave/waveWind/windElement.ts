import { Formula } from "../../../util/formula";
import { WaveWind } from "./WaveWind";
interface Transform {
  x: number;
  y: number;
}
export class WaveWindElement extends HTMLElement {
  private wave: WaveWind;
  private parent: HTMLElement;
  private styleElement: HTMLStyleElement;
  private width: number = 0;
  private height: number = 0;
  private degree: number = 0;
  /* 属性値の種類 */
  static get observedAttributes() {
    return [
      "x1",
      "y1",
      "x2",
      "y2",
      "px1",
      "py1",
      "px2",
      "py2",
      "amplitude",
      "frequency",
      "shift",
      "line-width",
      "main-color",
      "fade-color",
    ];
  }
  /* Waveキャンバスとスタイルを適用して子要素にする */
  /* WARNING : superのコンストラクタは必ず最初に呼ぶ */
  constructor() {
    super();
    this.wave = new WaveWind();
    this.styleElement = this.createStyleElement();
  }
  /* カスタム要素の関数 */
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(this.wave.svg);
    this.shadowRoot?.appendChild(this.styleElement);
    this.update();
  }

  disconnectedCallback() {
    this.wave.cleanUp();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    // console.log(`Attribute changed: ${name} from ${oldValue} to ${newValue}`);
    this.update();
  }
  /* ユーザー関数 */
  //属性値から、shadowRootの高さと見た目、波のセッターをいじる
  private update() {
    this.updateParent();
    const x1 = this.getFloatAttribute("x1");
    const y1 = this.getFloatAttribute("y1");
    const x2 = this.getFloatAttribute("x2");
    const y2 = this.getFloatAttribute("y2");
    const px1 = this.convertPercentWidthToPixel(this.getFloatAttribute("px1"));
    const py1 = this.convertPercentHeightToPixel(this.getFloatAttribute("py1"));
    const px2 = this.convertPercentWidthToPixel(this.getFloatAttribute("px2"));
    const py2 = this.convertPercentHeightToPixel(this.getFloatAttribute("py2"));
    // 属性から設定値を取得
    /* 情報をセット */
    const startNode: Transform = {
      x: x1 + px1,
      y: y1 + py1,
    };
    const stopNode: Transform = {
      x: x2 + px2,
      y: y2 + py2,
    };
    const mainColor: string = this.getAttribute("main-color") ?? "#ff0";
    const fadeColor: string = this.getAttribute("fade-color") ?? "#ff0";
    const amplitude: number = this.getFloatAttribute("amplitude");
    const frequency: number = this.getFloatAttribute("frequency");
    const shift: number = this.getFloatAttribute("shift");
    const lineWidth: number = this.getFloatAttribute("line-width");

    // Wave インスタンスの設定
    this.setHeight(amplitude);
    this.updateAppearanceBTwoPoints(startNode, stopNode);
    this.wave.setFrequency(frequency);
    this.wave.setShift(shift);
    this.wave.setLineWidth(lineWidth);
    this.wave.setMainColor(mainColor);
    this.wave.setFadeColor(fadeColor);
    this.wave.update();
  }
  private updateParent() {
    this.parent = this.parentElement as HTMLElement;
    if (!this.parent) this.parent = document.body;
  }
  /* 最初の点、目標の点にあわせて波の 長さ 角度 座標 を更新 */
  public updateAppearanceBTwoPoints(startNode: Transform, stopNode: Transform) {
    /* 長さを求める */
    const width = Formula.distanceBetweenPoints(startNode, stopNode);
    this.setWidth(width);
    /* 角度をもとめる */
    const degree = Formula.AngleBetweenPoints(startNode, stopNode);
    this.setRotate(degree);
    /* 座標を求める */
    /* WARNING : 先に横幅と角度を計算する必要がある */
    this.setTransform(startNode);
  }

  /* REVIEW : さらに疎結合にできる余地あり*/
  /* 回転に合わせて、左端をx1,y1の座標に移動する */
  public setTransform(node: Transform) {
    /* 角度、半分の高さと横幅をセット */
    const radian = (this.degree * Math.PI) / 180;
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    /* 適切に移動をさせるための情報 */
    const offsetX: number = -(halfWidth - halfWidth * Math.cos(radian));
    const offsetY: number = halfWidth * Math.sin(radian) - halfHeight;
    /* 代入 */
    this.style.left = `${node.x + offsetX}px`;
    this.style.top = `${node.y + offsetY}px`;
  }
  /* 横幅を変数とスタイルにセット */
  public setWidth(width: number) {
    this.width = width;
    this.style.width = `${width}px`;
  }
  /* 高さを変数とスタイルにセット */
  public setHeight(height: number) {
    this.height = height;
    this.style.height = `${height}px`;
  }
  /* 回転(deg)を変数とスタイルにセット */
  public setRotate(degree: number) {
    this.degree = degree;
    this.style.rotate = `${degree}deg`;
  }
  private createStyleElement(): HTMLStyleElement {
    const style = document.createElement("style");
    style.textContent = `
      :host {
          position : absolute;
          display: block;
          overflow:hidden;
        }
      svg {
          display: block;
          height : 100%;
          width : 100%;
        }
      `;
    return style;
  }
  /* 実数の属性をゲット */
  private getFloatAttribute(value: string): number {
    return parseFloat(this.getAttribute(value) || "0");
  }

  /* 親のwidthの%からpxに変換 */
  private convertPercentWidthToPixel(percentWidth: number) {
    const width = this.parent.clientWidth;
    const ratio = percentWidth / 100;
    return width * ratio;
  }
  /* 親のheightの%からpxに変換 */
  private convertPercentHeightToPixel(percentHeight: number) {
    const height = this.parent.clientHeight;
    const ratio = percentHeight / 100;
    return height * ratio;
  }
}
