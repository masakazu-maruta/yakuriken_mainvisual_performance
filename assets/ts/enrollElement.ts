import { GradientElement } from "./component/gradient/gradientElement";
import { RingElement } from "./component/ring/ringElement";
import { WaveFlowElement } from "./component/wave/waveFlow/waveFlowElement";
import { WaveWindElement } from "./component/wave/waveWind/windElement";
export const enrollElement = () => {
  customElements.define("custom-wave", WaveFlowElement);
  customElements.define("custom-wind", WaveWindElement);
  customElements.define("custom-ring", RingElement);
  customElements.define("custom-gradient", GradientElement);
};
