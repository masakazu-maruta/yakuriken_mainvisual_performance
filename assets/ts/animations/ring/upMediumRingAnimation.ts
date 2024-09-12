import { RingSetting, UpMediumRingSettings } from "./ring.config";
import { CalculateCurrentSetting } from "../globalAnimationSetting.config";

export const upMediumRingAnimation = (id: string) => {
  const element = document.getElementById(id) as HTMLElement;
  if (!element) return;
  window.addEventListener("DOMContentLoaded", () => {
    init(element);
    update(element);
  });
  window.addEventListener("resize", () => update(element));
};

function init(element: HTMLElement) {
  element.setAttribute("color", "rgba(255,255,255,1)");
}

function update(element: HTMLElement) {
  const setting: RingSetting = CalculateCurrentSetting(UpMediumRingSettings);
  element.style.top = `${setting.top}vw`;
  element.style.left = `${setting.left}vw`;
  element.style.height = `${setting.height}px`;
  element.style.width = `${setting.width}px`;
  element.setAttribute("duration", `${setting.duration}`);
  element.setAttribute("line-width", `${setting.lineWidth}`);
  element.setAttribute("number", `${setting.numberRing}`);
}
