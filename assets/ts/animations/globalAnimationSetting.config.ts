export const BREAKPOINTS = {
  pc: 1140,
  tablet: 768,
  mobile: 375,
};

/* ブレイクポイントを設定して、そこにwidthなどの値をコンポーネントごとにカスタムする */
export interface BreakpointSettings<T extends StyleSetting> {
  [key: number]: T;
}
export type StyleSetting = {
  [property: string]: string | number;
};

/* そのウィンドウサイズに対応したBreakPointSettingを返す */
export const CalculateCurrentSetting = <T extends StyleSetting>(settings: BreakpointSettings<T>) => {
  const containerWidth = document.body.clientWidth;
  let prevBreakPoint: number;
  let currBreakPoint: number;
  //pcの処理
  if (containerWidth >= BREAKPOINTS.pc) {
    prevBreakPoint = BREAKPOINTS.pc;
    currBreakPoint = BREAKPOINTS.pc;
  }
  //tabletの処理
  else if (containerWidth >= BREAKPOINTS.tablet) {
    prevBreakPoint = BREAKPOINTS.pc;
    currBreakPoint = BREAKPOINTS.tablet;
  }
  //spの処理
  else if (containerWidth >= BREAKPOINTS.mobile) {
    prevBreakPoint = BREAKPOINTS.tablet;
    currBreakPoint = BREAKPOINTS.mobile;
  }
  //spの処理 これは、間の値にならないので必要な条件分岐である
  else {
    prevBreakPoint = BREAKPOINTS.mobile;
    currBreakPoint = BREAKPOINTS.mobile;
  }
  const ratio = calculateWindowRatio(containerWidth, prevBreakPoint, currBreakPoint);
  return CalculateBetweenSetting(ratio, settings[prevBreakPoint], settings[currBreakPoint]);
};

/* ブレイクポイントで設定されている間の値を返す */
function CalculateBetweenSetting<T extends StyleSetting>(ratio: number, settings1: T, settings2: T): T {
  const interpolatedSettings: StyleSetting = {};
  for (const key in settings1) {
    if (settings1.hasOwnProperty(key) && settings2.hasOwnProperty(key)) {
      const value1 = settings1[key];
      const value2 = settings2[key];

      if (typeof value1 === "number" && typeof value2 === "number") {
        interpolatedSettings[key] = value1 * ratio + value2 * (1 - ratio);
      } else if (typeof value1 === "string" && typeof value2 === "string") {
        interpolatedSettings[key] = value1;
      }
    }
  }
  return interpolatedSettings as T;
}

/* BP = ブレイクポイント */
/* BP_A < ウィンドウサイズ <= BP_B 
/* のときウィンドウサイズがBP_Bにどのくらい寄っているかを返す */
function calculateWindowRatio(width: number, maxWidth: number, minWidth) {
  if (maxWidth == minWidth) return 1;
  return (width - minWidth) / (maxWidth - minWidth);
}
