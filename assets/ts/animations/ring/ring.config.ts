import {
  BREAKPOINTS,
  BreakpointSettings,
  StyleSetting,
} from "../globalAnimationSetting.config";

export interface RingSetting extends StyleSetting {
  top: number;
  left: number;
  width: number;
  height: number;
  duration: number;
  lineWidth: number;
  numberRing: number;
}

export const UpLargeRingSettings: BreakpointSettings<RingSetting> = {
  [BREAKPOINTS.pc]: {
    width: 160,
    height: 160,
    top: 8,
    left: 32,
    duration: 32,
    lineWidth: 0.5,
    numberRing: 4,
  },
  [BREAKPOINTS.tablet]: {
    width: 160,
    height: 160,
    top: 56,
    left: 56,
    duration: 32,
    lineWidth: 0.5,
    numberRing: 4,
  },
  [BREAKPOINTS.mobile]: {
    width: 100,
    height: 100,
    top: 12,
    left: 40,
    duration: 32,
    lineWidth: 0.5,
    numberRing: 4,
  },
};
export const UpMediumRingSettings: BreakpointSettings<RingSetting> = {
  [BREAKPOINTS.pc]: {
    width: 100,
    height: 100,
    top: 16,
    left: 56,
    duration: 48,
    lineWidth: 0.5,
    numberRing: 4,
  },
  [BREAKPOINTS.tablet]: {
    width: 100,
    height: 100,
    top: 80,
    left: 80,
    duration: 48,
    lineWidth: 0.5,
    numberRing: 4,
  },
  [BREAKPOINTS.mobile]: {
    width: 72,
    height: 72,
    top: 56,
    left: 72,
    duration: 48,
    lineWidth: 0.5,
    numberRing: 4,
  },
};
export const UpSmallRingSettings: BreakpointSettings<RingSetting> = {
  [BREAKPOINTS.pc]: {
    width: 72,
    height: 72,
    top: 32,
    left: 8,
    duration: 64,
    lineWidth: 0.5,
    numberRing: 4,
  },
  [BREAKPOINTS.tablet]: {
    width: 72,
    height: 72,
    top: 24,
    left: 88,
    duration: 64,
    lineWidth: 0.5,
    numberRing: 4,
  },
  [BREAKPOINTS.mobile]: {
    width: 48,
    height: 48,
    top: 4,
    left: 72,
    duration: 32,
    lineWidth: 0.5,
    numberRing: 4,
  },
};
export const DownLargeRingSettings: BreakpointSettings<RingSetting> = {
  [BREAKPOINTS.pc]: {
    width: 160,
    height: 160,
    top: 32,
    left: 72,
    duration: 32,
    lineWidth: 0.5,
    numberRing: 4,
  },
  [BREAKPOINTS.tablet]: {
    width: 160,
    height: 160,
    top: 96,
    left: 80,
    duration: 32,
    lineWidth: 0.5,
    numberRing: 4,
  },
  [BREAKPOINTS.mobile]: {
    width: 100,
    height: 100,
    top: 24,
    left: 72,
    duration: 32,
    lineWidth: 0.5,
    numberRing: 4,
  },
};
export const DownMediumRingSettings: BreakpointSettings<RingSetting> = {
  [BREAKPOINTS.pc]: {
    width: 100,
    height: 100,
    top: 8,
    left: 40,
    duration: 48,
    lineWidth: 0.5,
    numberRing: 4,
  },
  [BREAKPOINTS.tablet]: {
    width: 100,
    height: 100,
    top: 56,
    left: 4,
    duration: 48,
    lineWidth: 0.5,
    numberRing: 4,
  },
  [BREAKPOINTS.mobile]: {
    width: 64,
    height: 64,
    top: 88,
    left: 4,
    duration: 48,
    lineWidth: 0.5,
    numberRing: 4,
  },
};
export const DownSmallRingSettings: BreakpointSettings<RingSetting> = {
  [BREAKPOINTS.pc]: {
    width: 72,
    height: 72,
    top: 24,
    left: 6.4,
    duration: 64,
    lineWidth: 0.5,
    numberRing: 4,
  },
  [BREAKPOINTS.tablet]: {
    width: 72,
    height: 72,
    top: 16,
    left: 48,
    duration: 64,
    lineWidth: 0.5,
    numberRing: 4,
  },
  [BREAKPOINTS.mobile]: {
    width: 48,
    height: 48,
    top: 12,
    left: 56,
    duration: 32,
    lineWidth: 0.5,
    numberRing: 4,
  },
};
