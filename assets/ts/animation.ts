// アニメーション関数をインポート
import { backGradientAnimation } from "./animations/backGradient/backGradientAnimation";
import { frontWaveAnimation } from "./animations/wave/frontWaveAnimation";
import { backWaveAnimation } from "./animations/wave/backWaveAnimation";
import { downFrontWaveAnimation } from "./animations/wave/downFrontWaveAnimation";
import { downBackWaveAnimation } from "./animations/wave/downBackWaveAnimation";
import { windAnimation } from "./animations/wind/windAnimation";
import { upLargeRingAnimation } from "./animations/ring/upLargeRingAnimation";
import { upMediumRingAnimation } from "./animations/ring/upMediumRingAnimation";
import { upSmallRingAnimation } from "./animations/ring/upSmallRingAnimation";
import { downLargeRingAnimation } from "./animations/ring/downLargeRingAnimation";
import { downMediumRingAnimation } from "./animations/ring/downMediumRingAnimation";
import { downSmallRingAnimation } from "./animations/ring/downSmallRingAnimation";

export const animations = () => {
  backGradientAnimation("js-mainvisual__backGradient");
  windAnimation("js-mainvisual__wind");
  frontWaveAnimation("js-mainvisual__upFrontWave");
  backWaveAnimation("js-mainvisual__upBackWave");
  upLargeRingAnimation("js-mainvisual__upLargeRing");
  upMediumRingAnimation("js-mainvisual__upMediumRing");
  upSmallRingAnimation("js-mainvisual__upSmallRing");
  downFrontWaveAnimation("js-mainvisual__downFrontWave");
  downBackWaveAnimation("js-mainvisual__downBackWave");
  downLargeRingAnimation("js-mainvisual__downLargeRing");
  downMediumRingAnimation("js-mainvisual__downMediumRing");
  downSmallRingAnimation("js-mainvisual__downSmallRing");
};
