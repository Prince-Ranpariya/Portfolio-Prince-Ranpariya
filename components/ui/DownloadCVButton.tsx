'use client'

import { useState, useEffect } from "react";
import { CloudDownload, Check } from "lucide-react";

interface DownloadCVButtonProps {
  cvUrl?: string;
  fileName?: string;
}

export default function DownloadCVButton({
  cvUrl = "https://prince-ranpariya.github.io/Portfolio-Prince-Ranpariya/Prince%20Ranpariya-CV%201.pdf.pdf",
  fileName = "Prince_Ranpariya_CV.pdf",
}: DownloadCVButtonProps) {
  const [status, setStatus] = useState<"idle" | "downloading" | "completed">("idle");
  const [progress, setProgress] = useState(0);

  const handleDownload = () => {
    if (status !== "idle") return;

    setStatus("downloading");
    setProgress(0);
  };

  useEffect(() => {
    if (status !== "downloading") return;

    // Simulate progress increase over 2.2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus("completed");
          
          // Trigger the actual file download
          try {
            const link = document.createElement("a");
            link.href = cvUrl;
            link.setAttribute("download", fileName);
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (err) {
            console.error("Failed to trigger download:", err);
          }
          
          return 100;
        }
        // Increase progress organically
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [status, cvUrl, fileName]);

  // Reset to idle state after showing "completed" for 3 seconds
  useEffect(() => {
    if (status !== "completed") return;

    const timeout = setTimeout(() => {
      setStatus("idle");
      setProgress(0);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [status]);

  const translateYVal = 100 - progress;

  return (
    <button
      onClick={handleDownload}
      disabled={status === "downloading"}
      className="relative overflow-hidden w-[170px] md:w-[200px] h-[48px] md:h-[56px] rounded-[12px] md:rounded-[16px] border-2 border-[#0A0A0A] bg-white text-black font-display font-semibold text-[13px] md:text-[15px] cursor-pointer shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-all duration-300 active:scale-[0.98] select-none flex items-center justify-center disabled:cursor-not-allowed hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] hover:-translate-y-0.5"
      style={{ outline: "none" }}
      aria-label="Download CV"
    >
      {/* 1. Rising Water Layer */}
      <div
        className="absolute inset-x-0 bottom-0 bg-gradient-to-r from-[#00E5FF] to-[#00A8FF]"
        style={{
          height: "100%",
          transform: `translateY(${translateYVal}%)`,
          transition: "transform 0.15s linear",
          pointerEvents: "none",
        }}
      >
        {/* SVG Wave 1 (Front - faster, larger opacity) */}
        <svg
          viewBox="0 0 360 20"
          preserveAspectRatio="none"
          className="absolute left-0 w-[200%] h-5 -top-4 pointer-events-none wave-front"
        >
          <defs>
            <linearGradient id="wave-grad-front" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#00A8FF" />
            </linearGradient>
          </defs>
          <path
            d="M0,10 C30,20 60,0 90,10 C120,20 150,0 180,10 C210,20 240,0 270,10 C300,20 330,0 360,10 L360,20 L0,20 Z"
            fill="url(#wave-grad-front)"
          />
        </svg>

        {/* SVG Wave 2 (Back - slower, translucent) */}
        <svg
          viewBox="0 0 360 20"
          preserveAspectRatio="none"
          className="absolute left-0 w-[200%] h-5 -top-4 pointer-events-none wave-back"
          style={{ opacity: 0.4 }}
        >
          <defs>
            <linearGradient id="wave-grad-back" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00A8FF" />
              <stop offset="100%" stopColor="#00FF7F" />
            </linearGradient>
          </defs>
          <path
            d="M0,10 C45,20 90,0 135,10 C180,20 225,0 270,10 C315,20 360,0 405,10 L360,20 L0,20 Z"
            fill="url(#wave-grad-back)"
          />
        </svg>
      </div>

      {/* 2. Text / Icon Content Layer (Positioned on top of water with z-10) */}
      <div className="absolute inset-0 flex items-center justify-center gap-1.5 md:gap-2 text-[#0A0A0A] z-10">
        {status === "completed" ? (
          <>
            <Check className="w-4 h-4 md:w-5 md:h-5 text-[#00CC60]" />
            <span>CV Downloaded</span>
          </>
        ) : (
          <>
            <CloudDownload className="w-4 h-4 md:w-5 md:h-5 text-[#0A0A0A]" />
            <span>
              {status === "downloading"
                ? `Downloading... ${progress}%`
                : "Download CV"}
            </span>
          </>
        )}
      </div>
    </button>
  );
}
