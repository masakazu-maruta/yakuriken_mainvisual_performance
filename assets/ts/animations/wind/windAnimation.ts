import { WindSetting, WindSettings } from "./wind.config";
import { CalculateCurrentSetting } from "../globalAnimationSetting.config";

export const windAnimation = (id: string) => {
  const element = document.getElementById(id) as HTMLElement;
  if (!element) return;
  window.addEventListener("DOMContentLoaded", () => {
    init(element);
    update(element);
  });
  window.addEventListener("resize", () => update(element));
};

function init(element: HTMLElement) {
  element.setAttribute("main-color", "rgba(255,255,255,0.3)");
  element.setAttribute("fade-color", "rgba(255,255,255,0)");
}

function update(element: HTMLElement) {
  const setting: WindSetting = CalculateCurrentSetting(WindSettings);
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
  element.setAttribute("line-width", `${setting.lineWidth}`);
}
