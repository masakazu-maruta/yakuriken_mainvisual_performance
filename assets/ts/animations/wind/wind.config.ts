import { BREAKPOINTS, BreakpointSettings, StyleSetting } from "../globalAnimationSetting.config";

export interface WindSetting extends StyleSetting {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  px1: number;
  py1: number;
  px2: number;
  py2: number;
  amplitude: number;
  frequency: number;
  shift: number;
  // speed: number;
  lineWidth: number;
}

export const WindSettings: BreakpointSettings<WindSetting> = {
  [BREAKPOINTS.pc]: {
    x1: -36,
    y1: 36,
    x2: 36,
    y2: -36,
    px1: 0,
    py1: 112,
    px2: 84,
    py2: 0,
    amplitude: 36,
    frequency: 5,
    shift: 0,
    lineWidth: 3,
  },
  [BREAKPOINTS.tablet]: {
    x1: -31,
    y1: 31,
    x2: 31,
    y2: -31,
    px1: 0,
    py1: 92,
    px2: 100,
    py2: 16,
    amplitude: 31,
    frequency: 4,
    shift: 0,
    lineWidth: 3,
  },
  [BREAKPOINTS.mobile]: {
    x1: -23,
    y1: 23,
    x2: 23,
    y2: -23,
    px1: 0,
    py1: 112,
    px2: 100,
    py2: 24,
    amplitude: 23,
    frequency: 3.5,
    shift: 0,
    lineWidth: 3,
  },
};
