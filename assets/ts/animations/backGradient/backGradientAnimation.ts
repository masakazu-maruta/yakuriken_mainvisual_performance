import { BackGradientSetting, BackGradientSettings } from "./backGradient.config";
import { CalculateCurrentSetting } from "../globalAnimationSetting.config";

export const backGradientAnimation = (id: string) => {
  const element = document.getElementById(id) as HTMLElement;
  if (!element) return;
  window.addEventListener("DOMContentLoaded", () => {
    init(element);
    update(element);
  });
  window.addEventListener("resize", () => update(element));
};

function init(element: HTMLElement) {
  element.setAttribute("color1", "rgba(148,244,146,0.5)");
  element.setAttribute("color2", "rgba(152,240,247,0.5)");
  element.setAttribute("color-animate-dur", "8");
  element.setAttribute("rx-animate-dur", "16");
  element.setAttribute("ry-animate-dur", "16");
  element.setAttribute("rx-animate-ratio", "0.9");
  element.setAttribute("ry-animate-ratio", "0.7");
}

function update(element: HTMLElement) {
  const setting: BackGradientSetting = CalculateCurrentSetting(BackGradientSettings);
  element.style.left = `${setting.left}%`;
  element.style.bottom = `${setting.bottom}%`;
  element.style.width = `${setting.width}vw`;
  element.style.height = `${setting.height}vw`;
  element.style.rotate = `${setting.degree}deg`;
}
