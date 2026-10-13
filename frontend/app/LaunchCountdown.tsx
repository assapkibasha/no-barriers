"use client";

import { useEffect, useState } from "react";
import { IconX } from "@tabler/icons-react";
import styles from "./landing.module.css";

// One shared deadline for every visitor; the countdown never resets on refresh.
const launchDate = new Date("2026-10-20T00:00:00+02:00").getTime();
const dismissalKey = "no-barriers-launch-2026-10-20";

export default function LaunchCountdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try { setDismissed(localStorage.getItem(dismissalKey) === "dismissed"); } catch {}
    const update = () => setRemaining(Math.max(0, launchDate - Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (dismissed || remaining === 0) return null;
  const seconds = Math.floor((remaining ?? 7 * 86400000) / 1000);
  const values = [
    ["Days", Math.floor(seconds / 86400)],
    ["Hours", Math.floor(seconds / 3600) % 24],
    ["Minutes", Math.floor(seconds / 60) % 60],
    ["Seconds", seconds % 60],
  ] as const;

  const dismiss = () => {
    setDismissed(true);
    try { localStorage.setItem(dismissalKey, "dismissed"); } catch {}
  };

  return <aside className={styles.launchBanner} aria-label="New learning system launch">
    <div className={styles.launchInner}>
      <div className={styles.launchCopy}><strong>A new way to learn sign language is coming.</strong><span>Our new learning system arrives on 20 October.</span></div>
      <div className={styles.launchTimer} role="timer" aria-label="Time until the new learning system launches">{values.map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div>
      <button className={styles.launchClose} onClick={dismiss} aria-label="Dismiss launch countdown"><IconX size={20} /></button>
    </div>
  </aside>;
}

