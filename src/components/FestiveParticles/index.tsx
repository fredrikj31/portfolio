"use client";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadBasic } from "@tsparticles/basic";
import { loadDestroyUpdater } from "@tsparticles/updater-destroy";
import { loadEmittersPlugin } from "@tsparticles/plugin-emitters";
import { loadEmittersShapeSquare } from "@tsparticles/plugin-emitters-shape-square";
import { loadLifeUpdater } from "@tsparticles/updater-life";
import { loadLineShape } from "@tsparticles/shape-line";
import { loadRotateUpdater } from "@tsparticles/updater-rotate";
import { loadStrokeColorUpdater } from "@tsparticles/updater-stroke-color";
import { initOptions as initFirework } from "./configs/Firework";
import { initOptions as initSnow } from "./configs/Snow";
import { DateTime } from "luxon";

export const FestiveParticles = () => {
  const [init, setInit] = useState(false);

  const datetimeNow = DateTime.now();
  const particleToShow = useMemo<"firework" | "snow" | null>(() => {
    // Show "Firework" particles on the 31th of december and 1st of january
    if ((datetimeNow.month === 12 && datetimeNow.day === 31) || (datetimeNow.month === 1 && datetimeNow.day === 1)) {
      return "firework";
    }

    // Show "Snow" particles during december month
    if (datetimeNow.month === 12) {
      return "snow";
    }

    return null;
  }, [datetimeNow]);

  // this should be run only once per application lifetime
  useEffect(() => {
    if (!particleToShow) {
      return;
    }

    initParticlesEngine(async (engine) => {
      await loadBasic(engine);
      if (particleToShow === "firework") {
        await loadEmittersPlugin(engine, false);
        await loadEmittersShapeSquare(engine, false);
        await loadLineShape(engine, false);
        await loadRotateUpdater(engine, false);
        await loadDestroyUpdater(engine, false);
        await loadLifeUpdater(engine, false);
        await loadStrokeColorUpdater(engine, false);
      }

      if (particleToShow === "firework") {
        await engine.addPreset("firework", initFirework(engine), false);
      }
      if (particleToShow === "snow") {
        await engine.addPreset("snow", initSnow(), false);
      }
      await engine.refresh(true);
    }).then(() => {
      setInit(true);
    });
  }, [particleToShow]);

  if (init && particleToShow !== null) {
    return <Particles id="tsparticles" options={{ preset: particleToShow }} />;
  }

  return null;
};
