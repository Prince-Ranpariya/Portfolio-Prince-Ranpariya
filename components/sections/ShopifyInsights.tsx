"use client";

import { cn } from "@/lib/utils";
import { Sparkles, ShoppingBag, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  initialX: number;
  initialY: number;
  hoverY: number;
  initialOpacity?: number;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-[#00FF7F]",
  titleClassName = "text-[#00FF7F]",
  initialX,
  initialY,
  hoverY,
  initialOpacity = 0.6,
}: DisplayCardProps) {
  return (
    <motion.div
      initial={{ x: initialX, y: initialY, opacity: initialOpacity, scale: 1 }}
      animate={{ x: initialX, y: initialY, opacity: initialOpacity, scale: 1 }}
      whileHover={{
        y: hoverY,
        opacity: 1,
        scale: 1.04,
        zIndex: 50,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className={cn(
        "absolute flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]/90 backdrop-blur-sm px-4 py-3 [&>*]:flex [&>*]:items-center [&>*]:gap-2 shadow-lg cursor-none transition-colors duration-300",
        className
      )}
      style={{ originX: 0.5, originY: 0.5 }}
    >
      <div>
        <span className={cn("relative inline-block rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] p-1.5", iconClassName)}>
          {icon}
        </span>
        <p className={cn("text-lg font-bold font-display tracking-tight ml-2", titleClassName)}>{title}</p>
      </div>
      <p className="text-[14px] font-body text-[var(--text-secondary)] font-medium leading-snug">{description}</p>
      <p className="text-xs font-mono text-[var(--text-muted)]">{date}</p>
    </motion.div>
  );
}

export default function ShopifyInsights() {
  const cards = [
    {
      icon: <ShoppingBag className="size-4" />,
      title: "Custom Shopify Themes",
      description: "Hand-crafted custom Liquid layouts for higher conversions.",
      date: "Active setups",
      className: "[grid-area:stack]",
      iconClassName: "text-[#00FF7F]",
      titleClassName: "text-[#00FF7F]",
      initialX: 0,
      initialY: 0,
      hoverY: -65,
      initialOpacity: 0.55,
    },
    {
      icon: <Zap className="size-4" />,
      title: "Performance Optimization",
      description: "Asset minification, dynamic loading, and 90+ lighthouse scores.",
      date: "Completed recently",
      className: "[grid-area:stack]",
      iconClassName: "text-orange-400",
      titleClassName: "text-orange-400",
      initialX: 125,
      initialY: 70,
      hoverY: 10,
      initialOpacity: 0.55,
    },
    {
      icon: <Sparkles className="size-4" />,
      title: "App & API Integrations",
      description: "Seamless synchronization with headless Next.js APIs.",
      date: "Updated today",
      className: "[grid-area:stack]",
      iconClassName: "text-cyan-400",
      titleClassName: "text-cyan-400",
      initialX: 250,
      initialY: 140,
      hoverY: 80,
      initialOpacity: 1.0,
    },
  ];

  return (
    <section
      id="shopify-insights"
      className="relative py-24 md:py-32 overflow-hidden border-b border-[var(--border-color)] bg-[var(--bg-primary)] transition-colors duration-350"
      aria-label="Shopify insights highlights"
    >
      {/* Background gradients for premium feel */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[#00FF7F]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 xl:px-32 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-10">
        
        {/* Left Side: Copy */}
        <div className="w-full lg:w-[50%] flex flex-col items-start gap-6">
          <span className="eyebrow text-[#00FF7F]">Shopify Core Workflow</span>
          <h2 className="section-heading text-[var(--text-primary)] transition-colors duration-300">
            How I build high-performance e-commerce.
          </h2>
          <p className="text-[var(--text-secondary)] font-body text-base leading-relaxed max-w-[480px] transition-colors duration-300">
            From custom Liquid theme developments to headless storefront architectures, my development cycle focuses on conversion metrics, responsiveness, and blazing fast loading speeds.
          </p>
          <div className="flex flex-col gap-4 font-body mt-2">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF7F]" />
              <span className="text-[var(--text-primary)] font-semibold text-sm transition-colors duration-300">SEO & Schema Markup Ready</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="text-[var(--text-primary)] font-semibold text-sm transition-colors duration-300">Headless Storefront APIs</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
              <span className="text-[var(--text-primary)] font-semibold text-sm transition-colors duration-300">Dynamic Customizer Sections</span>
            </div>
          </div>
        </div>

        {/* Right Side: Stacked Display Cards */}
        <div className="w-full lg:w-[45%] flex items-center justify-center py-10 lg:py-0 pr-12 lg:pr-0 select-none">
          <div className="grid [grid-template-areas:'stack'] place-items-center h-[280px] sm:h-[320px] md:h-[370px] w-full scale-[0.72] sm:scale-[0.85] md:scale-100 origin-center">
            {cards.map((cardProps, index) => (
              <DisplayCard key={index} {...cardProps} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
