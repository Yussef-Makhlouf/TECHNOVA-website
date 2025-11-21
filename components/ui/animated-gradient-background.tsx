"use client"

import { motion } from "framer-motion"

export const AnimatedGradientBackground = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-gradient-to-br from-[#7B3FEF]/10 to-transparent rounded-full blur-3xl"
        animate={{
          x: ["-25%", "25%", "-25%"],
          y: ["-25%", "25%", "-25%"],
          rotate: [0, 180, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-gradient-to-tl from-[#00D9FF]/10 to-transparent rounded-full blur-3xl"
        animate={{
          x: ["25%", "-25%", "25%"],
          y: ["25%", "-25%", "25%"],
          rotate: [0, -180, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 20,
        }}
      />
    </motion.div>
  )
}
