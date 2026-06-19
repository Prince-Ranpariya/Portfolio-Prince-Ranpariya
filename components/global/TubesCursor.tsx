"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/global/ThemeProvider";

type TubesCursorProps = {
  initialColors?: string[];   // tubes base colors
  lightColors?: string[];     // lights colors
  lightIntensity?: number;    // lights intensity
  enableRandomizeOnClick?: boolean;
};

export default function TubesCursor({
  initialColors = ["#00FF7F", "#00E5FF", "#FF007F"], // custom matching colors (green, cyan, hotpink)
  lightColors = ["#00FF7F", "#FF5500", "#FF007F", "#00E5FF"],
  lightIntensity = 250,
  enableRandomizeOnClick = true,
}: TubesCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<any>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    // Only initialize WebGL Tubes if dark mode is active!
    if (!isDark) return;

    let removeClick: (() => void) | null = null;
    let destroyed = false;

    (async () => {
      try {
        const importDynamic = new Function("url", "return import(url)");
        const mod = await importDynamic(
          "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
        );
        const TubesCursorCtor = (mod as any).default ?? mod;

        if (!canvasRef.current || destroyed) return;

        const app = TubesCursorCtor(canvasRef.current, {
          tubes: {
            colors: initialColors,
            lights: {
              intensity: lightIntensity,
              colors: lightColors,
            },
          },
        });

        appRef.current = app;

        if (enableRandomizeOnClick) {
          const handler = () => {
            const colors = randomColors(initialColors.length);
            const lights = randomColors(lightColors.length);
            app.tubes.setColors(colors);
            app.tubes.setLightsColors(lights);
          };
          document.body.addEventListener("click", handler);
          removeClick = () =>
            document.body.removeEventListener("click", handler);
        }
      } catch (err) {
        console.error("WebGL Tubes Cursor load failed:", err);
      }
    })();

    return () => {
      destroyed = true;
      if (removeClick) removeClick();
      try {
        appRef.current?.dispose?.();
        appRef.current = null;
      } catch (e) {
        // ignore
      }
    };
  }, [initialColors, lightColors, lightIntensity, enableRandomizeOnClick, isDark]);

  if (!isDark) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 block h-full w-full pointer-events-none z-0 opacity-40 dark:opacity-45 transition-opacity duration-700"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

function randomColors(count: number) {
  return new Array(count).fill(0).map(
    () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
  );
}
