import { ISourceOptions, MoveDirection } from "@tsparticles/engine";

export function initOptions(): ISourceOptions {
  return {
    background: {
      color: "transparent",
    },
    particles: {
      number: {
        value: 100,
      },
      move: {
        direction: MoveDirection.bottom,
        enable: true,
        random: false,
        straight: false,
      },
      opacity: {
        value: { min: 0.1, max: 0.5 },
      },
      size: {
        value: { min: 1, max: 10 },
      },
      wobble: {
        distance: 20,
        enable: true,
        speed: {
          min: -5,
          max: 5,
        },
      },
    },
  };
}
