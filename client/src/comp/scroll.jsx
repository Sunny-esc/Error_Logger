// components/TechCarousel.jsx
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useRef, useLayoutEffect, useState } from "react";
import react1 from '../assets/svgs/logo/react1.svg';
import js from '../assets/svgs/logo/js.svg';
import tail from '../assets/svgs/logo/tail.svg';
 import linux from '../assets/svgs/logo/linux.svg';
 import node from '../assets/svgs/logo/node.svg';
import python from '../assets/svgs/logo/python.svg';
import html from '../assets/svgs/logo/html.svg';
import css from '../assets/svgs/logo/css.svg';
import cpp from '../assets/svgs/logo/cpp.svg';
import git from '../assets/svgs/logo/git.svg';

const techStack = [
  
  { name: "React", src: react1 },
  { name: "JavaScript", src:js  },
  { name: "Tailwindcss", src: tail },
  { name: "Node.js", src: node },
  { name: "Python", src: python },
  { name: "HTML", src: html },
  { name: "CSS", src: css },
  { name: "C++", src: cpp },
  { name: "Linux", src: linux },
  { name: "Git", src: git },
];

function useElementWidth(ref) {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const update = () => {
      if (ref.current) setWidth(ref.current.offsetWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}

export default function TechCarousel() {
  const containerRef = useRef(null);
  const width = useElementWidth(containerRef);
  const baseX = useMotionValue(0);

  useAnimationFrame((t, delta) => {
    const moveBy = (delta / 1000) * 100; // adjust speed here
    baseX.set(baseX.get() - moveBy);
    if (Math.abs(baseX.get()) >= width / 2) {
      baseX.set(0); // reset to start when halfway scrolled
    }
  });

  const x = useTransform(baseX, (v) => `${v}px`);

  const logos = [...techStack, ...techStack]; // duplicated for seamless loop

  return (
    <div className="relative w-full overflow-hidden py-4">
      <motion.div
        className="flex gap-12 px-4  min-w-max  "
        style={{ x }}
        ref={containerRef}
      >
        {logos.map((tech, idx) => (
          <div key={idx} className="flex items-center gap-3  opacity-70 hover:opacity-100 transition">
            <img src={tech.src} alt={tech.name} className="w-6 h-6" />
            <span className="text-sm font-medium">{tech.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
