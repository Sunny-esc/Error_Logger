// Layout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Layout = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
          <motion.main
        key={location.pathname}
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1], // smooth spring-like
        }}
        className="min-h-screen w-full overflow-hidden" // Optional styling
      >
        <Outlet />
      </motion.main>
    </AnimatePresence>
  );
};

export default Layout;
