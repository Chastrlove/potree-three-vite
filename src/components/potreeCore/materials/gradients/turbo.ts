import { Color } from "three";
import { IGradient } from "../types";

// 16 samples of the TURBU color scheme
// values taken from: https://gist.github.com/mikhailov-work/ee72ba4191942acecc03fe6da94fc73f
// original file licensed under Apache-2.0
export const TURBO: IGradient = [
  [0.0, new Color(0.18995, 0.07176, 0.23217)],
  [0.07, new Color(0.25107, 0.25237, 0.63374)],
  [0.13, new Color(0.27628, 0.42118, 0.89123)],
  [0.2, new Color(0.25862, 0.57958, 0.99876)],
  [0.27, new Color(0.15844, 0.73551, 0.92305)],
  [0.33, new Color(0.09267, 0.86554, 0.7623)],
  [0.4, new Color(0.19659, 0.94901, 0.59466)],
  [0.47, new Color(0.42778, 0.99419, 0.38575)],
  [0.53, new Color(0.64362, 0.98999, 0.23356)],
  [0.6, new Color(0.80473, 0.92452, 0.20459)],
  [0.67, new Color(0.93301, 0.81236, 0.22667)],
  [0.73, new Color(0.99314, 0.67408, 0.20348)],
  [0.8, new Color(0.9836, 0.49291, 0.12849)],
  [0.87, new Color(0.92105, 0.31489, 0.05475)],
  [0.93, new Color(0.81608, 0.18462, 0.01809)],
  [1.0, new Color(0.66449, 0.08436, 0.00424)],
];
