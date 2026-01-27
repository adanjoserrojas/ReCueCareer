"use client";

import Image from 'next/image'
import LogoImg from '@/app/Logos2.png';
import { Button } from "@/components/ui/button";
import {
NavigationMenu,
NavigationMenuContent,
NavigationMenuItem,
NavigationMenuLink,
NavigationMenuList,
NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export const Header1 = () => {
const navigationItems = [
    {
    title: "Home",
    href: "/getStarted",
    href2: "/",
    description: "",
    },
    {
    title: "Product",
    description: "Managing a small business today is already tough.",
    items: [
        {
        title: "Reports",
        href: "/reports",
        },
        {
        title: "Statistics",
        href: "/statistics",
        },
        {
        title: "Dashboards",
        href: "/dashboards",
        },
        {
        title: "Recordings",
        href: "/recordings",
        },
    ],
    },
];

const [isOpen, setOpen] = useState(false);

// Animation variants
const menuVariants = {
    hidden: { 
        opacity: 0, 
        y: -20,
        transition: {
            duration: 0.2,
            when: "afterChildren",
        }
    },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.3,
            when: "beforeChildren",
            staggerChildren: 0.1,
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.2,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.3 }
    },
    exit: { opacity: 0, x: -20 }
};

const subItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.2 }
    }
};

return (
    <div className="w-full fixed z-40 top-0 left-0 px-4 sm:px-6 lg:px-8">
    <div className="absolute inset-0 backdrop-blur-md mask-to-t pointer-events-none"></div>
    <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
        <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
        <NavigationMenu className="flex justify-start items-start">
            <NavigationMenuList className="flex justify-start gap-4 flex-row">
            {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title} className="text-Secondary">
                {item.href ? (
                    <>
                    <NavigationMenuLink href={item.href2}>
                        <Button className="text-Secondary">
                            {item.title}
                        </Button>
                    </NavigationMenuLink>
                    </>
                ) : (
                    <>
                    <NavigationMenuTrigger className="font-inter text-sm  text-Secondary">
                        {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="!w-[450px] p-4">
                        <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                        <div className="flex flex-col h-full justify-between">
                            <div className="flex flex-col">
                            <p className="text-base">{item.title}</p>
                            <p className="text-muted-foreground text-sm">
                                {item.description}
                            </p>
                            </div>
                            <Button size="sm" className="mt-10">
                            Book a call today
                            </Button>
                        </div>
                        <div className="flex flex-col text-sm h-full justify-end">
                            {item.items?.map((subItem) => (
                            <NavigationMenuLink
                                href={subItem.href}
                                key={subItem.title}
                                className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                            >
                                <span>{subItem.title}</span>
                                <MoveRight className="w-4 h-4 text-muted-foreground" />
                            </NavigationMenuLink>
                            ))}
                        </div>
                        </div>
                    </NavigationMenuContent>
                    </>
                )}
                </NavigationMenuItem>
            ))}
            </NavigationMenuList>
        </NavigationMenu>
        </div>
        <div className="flex lg:justify-center">
        <Image
            src={LogoImg}
            width={50}
            height={50}
            alt="ReCueCareer Logo"
        />
        </div>
        <div className="flex justify-end w-full gap-4">
        <Link href="/getStarted" passHref><Button variant="outline">Get Started</Button></Link>
        </div>
        <div className="flex w-12 shrink lg:hidden items-end justify-end">
        <motion.div
            whileTap={{ scale: 0.95 }}
        >
            <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
            <AnimatePresence mode="wait">
                {isOpen ? (
                <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <X className="w-5 h-5" />
                </motion.div>
                ) : (
                <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Menu className="w-5 h-5" />
                </motion.div>
                )}
            </AnimatePresence>
            </Button>
        </motion.div>
        
        <AnimatePresence>
            {isOpen && (
            <motion.div 
                className="absolute w-full top-20 left-0 rounded-2xl shadow-lg border-2 border-Secondary/20"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {/* Backdrop blur overlay */}
                <motion.div 
                className="absolute inset-0 bg-BackgroundNavyBlue/95 backdrop-blur-xl rounded-2xl border-Secondary/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                />
                
                {/* Menu content */}
                <div className="relative flex flex-col w-full py-6 px-6 gap-6">
                
                {navigationItems.map((item, index) => (
                    <motion.div 
                    key={item.title}
                    variants={itemVariants}
                    className="border-b border-white/10 pb-4 last:border-b-0"
                    >
                    <div className="flex flex-col gap-3">
                        {item.href ? (
                        <Link
                            href="/getStarted"
                            onClick={() => setOpen(false)}
                            className="group flex justify-between items-center py-2"
                        >
                            <motion.span 
                            className="text-xl font-semibold text-LightCutsieGrayMiau group-hover:text-PowerfulYellow transition-colors"
                            whileHover={{ x: 5 }}
                            >
                            {item.title}
                            </motion.span>
                            <motion.div
                            className="text-PowerfulYellow"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                            >
                            <MoveRight className="w-5 h-5" />
                            </motion.div>
                        </Link>
                        ) : (
                        <div className="py-2">
                            <p className="text-xl font-semibold text-LightCutsieGrayMiau">{item.title}</p>
                            {item.description && (
                            <p className="text-sm text-LightCutsieGrayMiau/50 mt-1">{item.description}</p>
                            )}
                        </div>
                        )}
                        
                        {item.items && (
                        <motion.div 
                            className="flex flex-col gap-2 pl-4 border-l-2 border-PowerfulYellow/30"
                            initial="hidden"
                            animate="visible"
                            variants={{
                            visible: {
                                transition: {
                                staggerChildren: 0.05,
                                delayChildren: 0.1 * index,
                                }
                            }
                            }}
                        >
                            {item.items.map((subItem) => (
                            <motion.div
                                key={subItem.title}
                                variants={subItemVariants}
                            >
                                <Link
                                href={subItem.href}
                                onClick={() => setOpen(false)}
                                className="group flex justify-between items-center py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
                                >
                                <span className="text-LightCutsieGrayMiau/70 group-hover:text-Secondary transition-colors">
                                    {subItem.title}
                                </span>
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileHover={{ opacity: 1, x: 0 }}
                                    className="text-Secondary"
                                >
                                    <MoveRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                                </Link>
                            </motion.div>
                            ))}
                        </motion.div>
                        )}
                    </div>
                    </motion.div>
                ))}
                
                {/* CTA Button at bottom */}
                <motion.div
                    variants={itemVariants}
                    className="pt-4"
                >
                    <Link href="/getStarted" onClick={() => setOpen(false)}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-PowerfulYellow to-Secondary text-Primary font-semibold text-lg shadow-lg shadow-PowerfulYellow/20"
                    >
                        Get Started
                    </motion.button>
                    </Link>
                </motion.div>
                </div>
            </motion.div>
            )}
        </AnimatePresence>
        </div>
    </div>
    </div>
);
};