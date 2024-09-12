import { BREAKPOINTS, BreakpointSettings, StyleSetting } from "../globalAnimationSetting.config";

export interface BackGradientSetting extends StyleSetting {
  bottom: number;
  left: number;
  width: number;
  height: number;
  degree: number;
}

export const BackGradientSettings: BreakpointSettings<BackGradientSetting> = {
  [BREAKPOINTS.pc]: {
    left: -12,
    bottom: 0,
    width: 128,
    height: 64,
    degree: -20,
  },
  [BREAKPOINTS.tablet]: {
    left: -64,
    bottom: 12,
    width: 240,
    height: 112,
    degree: -50,
  },
  [BREAKPOINTS.mobile]: {
    left: -48,
    bottom: 24,
    width: 256,
    height: 128,
    degree: -34,
  },
};
