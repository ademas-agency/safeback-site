"use client";

import { Lottie } from "lottie-react";
import animationData from "../../public/animations/gradient-bg.json";

export default function LottieGradientBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Lottie
        src={animationData}
        loop
        autoplay
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
