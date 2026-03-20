"use client";
import { useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

const DOORS = [
  "/doors/garage.jpg",
  "/doors/vault.jpg",
  "/doors/barn.jpg",
  "/doors/spaceship.jpg",
];

type Phase = "idle" | "closing" | "opening";

interface GarageDoorTransitionProps {
  children: ReactNode;
}

export default function GarageDoorTransition({
  children,
}: GarageDoorTransitionProps) {
  const [doorSrc, setDoorSrc] = useState(DOORS[0]);
  const [phase, setPhase] = useState<Phase>("idle");
  const overlayRef = useRef<HTMLDivElement>(null);
  const pendingHref = useRef<string>("");
  const doorIndex = useRef(0);
  const router = useRouter();
  const pathname = usePathname();

  const runTransition = useCallback((href: string) => {
    doorIndex.current = (doorIndex.current + 1) % DOORS.length;
    setDoorSrc(DOORS[doorIndex.current]);
    setPhase("closing");
    pendingHref.current = href;
  }, []);

  const handleAnimationEnd = () => {
    if (phase === "closing") {
      router.push(pendingHref.current);
    }
  };

  useEffect(() => {
    if (phase === "closing") {
      setPhase("opening");
    }
  }, [pathname]);

  const handleOpenEnd = () => {
    if (phase === "opening") setPhase("idle");
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest(
        "a[href]",
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const url = new URL(a.href, location.origin);
      if (url.origin !== location.origin) return;
      if (url.pathname === pathname) return;
      e.preventDefault();
      runTransition(url.pathname);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname, runTransition]);

  return (
    <>
      {children}

      {phase !== "idle" && (
        <div
          ref={overlayRef}
          onAnimationEnd={
            phase === "closing" ? handleAnimationEnd : handleOpenEnd
          }
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,
            pointerEvents: "none",
            backgroundImage: `url(${doorSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            animation:
              phase === "closing"
                ? "doorClose 0.6s cubic-bezier(0.4,0,0.2,1) forwards"
                : "doorOpen 0.6s cubic-bezier(0.4,0,0.2,1) forwards",
          }}
        />
      )}

      <style>{`
        @keyframes doorClose {
          from { clip-path: inset(100% 0 0 0); }
          to   { clip-path: inset(0% 0 0 0); }
        }
        @keyframes doorOpen {
          from { clip-path: inset(0% 0 0 0); }
          to   { clip-path: inset(0% 0 100% 0); }
        }
      `}</style>
    </>
  );
}
