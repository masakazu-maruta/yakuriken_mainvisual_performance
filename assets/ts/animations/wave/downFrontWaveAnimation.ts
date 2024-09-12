import { WaveSetting, DownFrontWaveSettings } from "./wave.config";
import { CalculateCurrentSetting } from "../globalAnimationSetting.config";

export const downFrontWaveAnimation = (id: string) => {
  const element = document.getElementById(id) as HTMLElement;
  if (!element) return;
  window.addEventListener("DOMContentLoaded", () => {
    init(element);
    update(element);
  });
  window.addEventListener("resize", () => update(element));
};

function init(element: HTMLElement) {
  element.setAttribute("color", "rgba(188,242,194,1)");
}

function update(element: HTMLElement) {
  const setting: WaveSetting = CalculateCurrentSetting(DownFrontWaveSettings);
  element.setAttribute("x1", `${setting.x1}`);
  element.setAttribute("y1", `${setting.y1}`);
  element.setAttribute("x2", `${setting.x2}`);
  element.setAttribute("y2", `${setting.y2}`);
  element.setAttribute("px1", `${setting.px1}`);
  element.setAttribute("py1", `${setting.py1}`);
  element.setAttribute("px2", `${setting.px2}`);
  element.setAttribute("py2", `${setting.py2}`);
  element.setAttribute("amplitude", `${setting.amplitude}`);
  element.setAttribute("frequency", `${setting.frequency}`);
  element.setAttribute("shift", `${setting.shift}`);
  element.setAttribute("speed", `${setting.speed}`);
  element.setAttribute("line-width", `${setting.lineWidth}`);
}
