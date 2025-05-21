"use client";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export function ParticlesBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const isDark = theme === "dark";

  if (!mounted) return null;

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: 0 },
        background: { color: { value: isDark ? "#181A1B" : "#f8fafc" } },
        particles: {
          number: { value: 40, density: { enable: true, area: 800 } },
          color: { value: isDark ? "#fff" : ["#39C5BB", "#0ff1ce", "#00bcd4"] },
          links: {
            enable: true,
            color: isDark ? "#fff" : "#00bcd4",
            distance: 130,
            opacity: 0.3,
            width: 1.2,
          },
          move: { enable: true, speed: 1.2, outModes: "bounce" },
          opacity: { value: 0.5 },
          size: { value: 2.5 },
        },
        detectRetina: true,
      }}
      style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0 }}
    />
  );
} 