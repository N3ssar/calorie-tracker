import { useEffect, useState } from "react";
const backgrounds = [
  "radial-gradient(circle at top, #1f2937 0%, #111827 100%)", // slate gray → very dark
  "radial-gradient(circle at top, #2d1b4e 0%, #0f0e17 100%)", // deep purple → black
  "radial-gradient(circle at top, #1e3a5f 0%, #0a192f 100%)", // navy blue → dark ocean
  "radial-gradient(circle at top, #3b1e2e 0%, #11050f 100%)", // dark wine/reddish → almost black
  "radial-gradient(circle at top, #2a3f1e 0%, #0d1306 100%)" // dark forest green → deep black
];

interface IBackgroundWrapperProps {
  children: React.ReactNode;
}
export default function BackgroundWrapper({
  children
}: IBackgroundWrapperProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % backgrounds.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: backgrounds[index],
        transition: "background 1.5s ease-in-out"
      }}
    >
      {children}
    </div>
  );
}
