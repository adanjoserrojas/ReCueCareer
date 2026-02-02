"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import LogoImg from "@/app/Logos2.png";
import { Menu, X, LayoutDashboard, FileText, Settings, BarChart3 } from "lucide-react";

export default function DashboardNavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { title: "Job Requirement Extractor", href: "/jobRequirementExtractor", icon: FileText },
        { title: "Auto Apply", href: "/autoApply", icon: BarChart3 },
        { title: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <nav className="w-full fixed z-50 top-0 left-0">
            {/* Backdrop blur effect */}
            <div className="absolute inset-0 bg-transparent backdrop-blur-3xl border-b border-Secondary/10" />
            
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    
                    {/* Logo */}
                    <motion.div 
                        className="flex items-center gap-3"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <Link href="/" className="flex items-center gap-3">
                            <Image
                                src={LogoImg}
                                width={40}
                                height={40}
                                alt="ReCueCareer Logo"
                                className=""
                            />
                            <span className="hidden sm:block text-xl font-bold text-Primary">
                                ReCueCareer
                            </span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <motion.div
                                key={item.title}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-LightCutsieGrayMiau/80 hover:text-Secondary hover:bg-white/5 transition-all duration-200"
                                >
                                    <item.icon className="w-4 h-4" />
                                    <span className="font-medium">{item.title}</span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Desktop Logout Button */}
                    <div className="hidden lg:flex items-center">
                        <motion.a
                            href="/auth/logout"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-PowerfulYellow to-Secondary text-Primary hover:shadow-lg hover:shadow-PowerfulYellow/20 transition-all duration-200"
                        >
                            Log Out
                        </motion.a>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="lg:hidden p-2 rounded-xl text-LightCutsieGrayMiau hover:bg-white/10 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="w-6 h-6" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu className="w-6 h-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="lg:hidden absolute top-16 left-0 right-0 mx-4"
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <div className="bg-BackgroundNavyBlue/95 backdrop-blur-xl rounded-2xl border border-Secondary/20 shadow-xl shadow-black/20 overflow-hidden">
                            <div className="flex flex-col p-4 gap-2">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-LightCutsieGrayMiau hover:text-Secondary hover:bg-white/5 transition-all duration-200"
                                        >
                                            <item.icon className="w-5 h-5 text-PowerfulYellow" />
                                            <span className="font-medium">{item.title}</span>
                                        </Link>
                                    </motion.div>
                                ))}
                                
                                {/* Mobile Logout Button */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: navItems.length * 0.1 }}
                                    className="pt-2 mt-2 border-t border-Secondary/10"
                                >
                                    <a
                                        href="/auth/logout"
                                        className="flex items-center justify-center w-full px-4 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-PowerfulYellow to-Secondary text-Primary hover:shadow-lg hover:shadow-PowerfulYellow/20 transition-all duration-200"
                                    >
                                        Log Out
                                    </a>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}