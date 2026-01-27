"use client";

import { motion } from "framer-motion";
import { IoSettingsSharp } from "react-icons/io5";
import { HiArrowRight } from "react-icons/hi2";
import Link from "next/link";
import { useState } from "react";
import  { Header1 } from '@/components/ui/header';

export default function GetStartedPage() {
  const [hoveredOption, setHoveredOption] = useState<"login" | "signup" | null>(null);

  return (
    <div className="relative min-h-screen h-screen w-full bg-BackgroundNavyBlue">
      {/* Rotating Gear Background - Half visible on left */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <IoSettingsSharp className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] text-Secondary/20" />
        </motion.div>
      </div>

      {/* Ambient glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-PowerfulYellow/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-Primary/20 blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen h-full flex flex-col">
        {/*{/* Header 
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="shrink-0 py-6 lg:py-8 px-6 md:px-12"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-PowerfulYellow to-Secondary flex items-center justify-center shadow-lg shadow-PowerfulYellow/20">
                <span className="text-Primary font-bold text-lg lg:text-xl">R</span>
              </div>
              <span className="text-LightCutsieGrayMiau font-bold text-xl lg:text-2xl">RecueCareer</span>
            </div>
            <nav className="hidden md:flex gap-8">
              <a href="#" className="text-LightCutsieGrayMiau/60 hover:text-LightCutsieGrayMiau transition">Features</a>
              <a href="#" className="text-LightCutsieGrayMiau/60 hover:text-LightCutsieGrayMiau transition">About</a>
              <a href="#" className="text-LightCutsieGrayMiau/60 hover:text-LightCutsieGrayMiau transition">Contact</a>
            </nav>
          </div>
        </motion.header>*/}
        <Header1 />

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-6 md:px-12 mt-20">
          <div className="w-full max-w-4xl">
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-center mb-12 md:mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-LightCutsieGrayMiau leading-tight mb-4">
                Your Career Journey
                <br />
                <span className="bg-gradient-to-r from-PowerfulYellow via-Secondary to-PowerfulYellow bg-clip-text text-transparent">
                  Starts Here
                </span>
              </h1>
              <p className="text-LightCutsieGrayMiau/60 text-md md:text-lg max-w-xl mx-auto">
                Join thousands of professionals advancing their careers with RecueCareer
              </p>
            </motion.div>

            {/* Action Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid md:grid-cols-2 gap-6 md:gap-8"
            >
              {/* Login Option */}
              <motion.a
                href="/auth/login"
                onMouseEnter={() => setHoveredOption("login")}
                onMouseLeave={() => setHoveredOption(null)}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl p-8 md:p-10 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl cursor-pointer transition-all duration-300 hover:border-PowerfulYellow/50 hover:shadow-2xl hover:shadow-PowerfulYellow/10"
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-PowerfulYellow/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-PowerfulYellow text-sm font-semibold tracking-wider uppercase">
                      Welcome Back
                    </span>
                    <motion.div
                      animate={{ x: hoveredOption === "login" ? 5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiArrowRight className="w-6 h-6 text-PowerfulYellow" />
                    </motion.div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-LightCutsieGrayMiau mb-3">
                    Log In
                  </h2>
                  <p className="text-LightCutsieGrayMiau/60 text-base md:text-lg">
                    Continue where you left off and access your personalized dashboard
                  </p>

                  {/* Decorative element */}
                  <div className="mt-8 flex items-center gap-3">
                    <div className="h-1 w-12 rounded-full bg-gradient-to-r from-PowerfulYellow to-Secondary"></div>
                    <span className="text-LightCutsieGrayMiau/40 text-sm">Secure authentication</span>
                  </div>
                </div>
              </motion.a>

              {/* Sign Up Option */}
              <motion.a
                href="/auth/login?screen_hint=signup"
                onMouseEnter={() => setHoveredOption("signup")}
                onMouseLeave={() => setHoveredOption(null)}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl p-8 md:p-10 bg-gradient-to-br from-PowerfulYellow/20 to-Secondary/10 border border-PowerfulYellow/20 backdrop-blur-xl cursor-pointer transition-all duration-300 hover:border-PowerfulYellow/60 hover:shadow-2xl hover:shadow-PowerfulYellow/20"
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-PowerfulYellow/30 to-Secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-Secondary text-sm font-semibold tracking-wider uppercase">
                      Get Started
                    </span>
                    <motion.div
                      animate={{ x: hoveredOption === "signup" ? 5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiArrowRight className="w-6 h-6 text-Secondary" />
                    </motion.div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-LightCutsieGrayMiau mb-3">
                    Sign Up
                  </h2>
                  <p className="text-LightCutsieGrayMiau/60 text-base md:text-lg">
                    Create your free account and start building your future today
                  </p>

                  {/* Decorative element */}
                  <div className="mt-8 flex items-center gap-3">
                    <div className="h-1 w-12 rounded-full bg-gradient-to-r from-Secondary to-PowerfulYellow"></div>
                    <span className="text-LightCutsieGrayMiau/40 text-sm">Free forever plan</span>
                  </div>
                </div>
              </motion.a>
            </motion.div>

            {/* Features quick glimpse */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-wrap justify-center gap-6 md:gap-10 mt-12 md:mt-16"
            >
              {["AI-Powered Insights", "Career Tracking", "Job Matching"].map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                  className="flex items-center gap-2 text-LightCutsieGrayMiau/50"
                >
                  <div className="w-2 h-2 rounded-full bg-PowerfulYellow"></div>
                  <span className="text-sm md:text-base">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </main>

        {/* Footer / Terms */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="shrink-0 py-6 px-6 text-center"
        >
          <p className="text-xs md:text-sm text-LightCutsieGrayMiau/40">
            By continuing, you agree to our{" "}
            <Link href="#" className="underline hover:text-LightCutsieGrayMiau/60 transition">
              Terms of Service
            </Link>
            {" "}and{" "}
            <Link href="#" className="underline hover:text-LightCutsieGrayMiau/60 transition">
              Privacy Policy
            </Link>
          </p>
        </motion.footer>
      </div>
    </div>
  );
}