"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Zap,
  Target,
  CheckCircle2,
  Clock,
  Briefcase,
  MapPin,
  DollarSign,
  Building2,
  Sparkles,
  Play,
  Pause,
  Settings2,
  Filter,
  TrendingUp,
  Send,
  FileCheck,
  AlertCircle,
  ChevronRight,
  Globe,
  Star,
  Crown,
  Loader2,
  RefreshCw,
  Eye,
  ExternalLink,
} from "lucide-react";
import DashboardNavBar from "@/components/ui/dashboard-nav-bar";

// Mock data for demonstration
const MOCK_JOBS = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Google",
    location: "Mountain View, CA",
    salary: "$180k - $250k",
    match: 95,
    status: "applied",
    logo: "G",
    color: "#4285F4",
    tags: ["React", "TypeScript", "Node.js"],
    postedAgo: "2h ago",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Stripe",
    location: "San Francisco, CA",
    salary: "$150k - $200k",
    match: 92,
    status: "pending",
    logo: "S",
    color: "#635BFF",
    tags: ["Python", "React", "AWS"],
    postedAgo: "4h ago",
  },
  {
    id: 3,
    title: "Frontend Engineer",
    company: "Airbnb",
    location: "Remote",
    salary: "$140k - $180k",
    match: 88,
    status: "reviewing",
    logo: "A",
    color: "#FF5A5F",
    tags: ["React", "GraphQL", "CSS"],
    postedAgo: "6h ago",
  },
  {
    id: 4,
    title: "Software Engineer II",
    company: "Netflix",
    location: "Los Gatos, CA",
    salary: "$170k - $220k",
    match: 85,
    status: "queued",
    logo: "N",
    color: "#E50914",
    tags: ["Java", "Microservices", "AWS"],
    postedAgo: "8h ago",
  },
  {
    id: 5,
    title: "Backend Engineer",
    company: "Spotify",
    location: "New York, NY",
    salary: "$145k - $190k",
    match: 82,
    status: "queued",
    logo: "S",
    color: "#1DB954",
    tags: ["Python", "Go", "Kubernetes"],
    postedAgo: "12h ago",
  },
];

const STATS = [
  { label: "Applied Today", value: "47", icon: Send, trend: "+12" },
  { label: "In Review", value: "23", icon: Eye, trend: "+5" },
  { label: "Interviews", value: "8", icon: FileCheck, trend: "+3" },
  { label: "Success Rate", value: "34%", icon: TrendingUp, trend: "+2%" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AutoApplyPage() {
  const [isAutoPilotOn, setIsAutoPilotOn] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [applyingJobId, setApplyingJobId] = useState<number | null>(null);
  const [appliedCount, setAppliedCount] = useState(47);
  const [showSettings, setShowSettings] = useState(false);

  // Simulated auto-apply animation
  useEffect(() => {
    if (isAutoPilotOn && !applyingJobId) {
      const pendingJob = MOCK_JOBS.find((j) => j.status === "queued");
      if (pendingJob) {
        const timer = setTimeout(() => {
          setApplyingJobId(pendingJob.id);
          setTimeout(() => {
            setApplyingJobId(null);
            setAppliedCount((c) => c + 1);
          }, 2000);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [isAutoPilotOn, applyingJobId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "reviewing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "queued":
        return "bg-white/10 text-white/60 border-white/20";
      default:
        return "bg-white/10 text-white/60 border-white/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
        return CheckCircle2;
      case "pending":
        return Clock;
      case "reviewing":
        return Eye;
      case "queued":
        return Clock;
      default:
        return Clock;
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-PowerfulYellow/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-Secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-PowerfulYellow/5 to-Secondary/5 rounded-full blur-3xl" />
      </div>

      <DashboardNavBar />

      <main className="relative pt-24 lg:pt-28 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-PowerfulYellow/20 to-Secondary/20 border border-PowerfulYellow/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-PowerfulYellow" />
              <span className="text-sm font-medium text-Secondary">
                AI-Powered Job Applications
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Auto Apply{" "}
              <span className="bg-gradient-to-r from-PowerfulYellow to-Secondary bg-clip-text text-transparent">
                Magic
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Let our AI handle your job applications while you focus on what
              matters. One click, hundreds of applications.
            </p>
          </motion.div>

          {/* Main Control Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-PowerfulYellow/20 via-transparent to-Secondary/20 rounded-3xl blur-xl" />
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Auto Pilot Toggle */}
                <div className="flex items-center gap-6">
                  <motion.button
                    onClick={() => setIsAutoPilotOn(!isAutoPilotOn)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative group flex items-center gap-4 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-500 ${
                      isAutoPilotOn
                        ? "bg-gradient-to-r from-PowerfulYellow to-Secondary text-Primary shadow-lg shadow-PowerfulYellow/30"
                        : "bg-white/10 text-white border border-white/20 hover:border-PowerfulYellow/50"
                    }`}
                  >
                    <motion.div
                      animate={isAutoPilotOn ? { rotate: 360 } : { rotate: 0 }}
                      transition={{
                        duration: 2,
                        repeat: isAutoPilotOn ? Infinity : 0,
                        ease: "linear",
                      }}
                    >
                      {isAutoPilotOn ? (
                        <Rocket className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </motion.div>
                    <span>
                      {isAutoPilotOn ? "Auto Pilot ON" : "Start Auto Pilot"}
                    </span>
                    {isAutoPilotOn && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </motion.button>

                  <div className="hidden sm:block h-12 w-px bg-white/10" />

                  <motion.button
                    onClick={() => setShowSettings(!showSettings)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Settings2 className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Live Stats */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={
                          isAutoPilotOn ? { scale: [1, 1.2, 1] } : { scale: 1 }
                        }
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className={`w-2 h-2 rounded-full ${isAutoPilotOn ? "bg-green-400" : "bg-white/30"}`}
                      />
                      <span className="text-white/60 text-sm">
                        {isAutoPilotOn ? "Applying..." : "Ready"}
                      </span>
                    </div>
                    <div className="h-4 w-px bg-white/10" />
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-PowerfulYellow" />
                      <span className="text-white font-semibold">
                        {appliedCount}
                      </span>
                      <span className="text-white/40 text-sm">today</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings Panel */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 mt-6 border-t border-white/10">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <label className="text-white/60 text-sm mb-2 block">
                            Daily Limit
                          </label>
                          <input
                            type="number"
                            defaultValue={100}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-PowerfulYellow/50"
                          />
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <label className="text-white/60 text-sm mb-2 block">
                            Min Match Score
                          </label>
                          <input
                            type="number"
                            defaultValue={75}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-PowerfulYellow/50"
                          />
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <label className="text-white/60 text-sm mb-2 block">
                            Salary Range
                          </label>
                          <input
                            type="text"
                            defaultValue="$100k+"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-PowerfulYellow/50"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-PowerfulYellow/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-PowerfulYellow/30 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-PowerfulYellow/20 to-Secondary/10">
                      <stat.icon className="w-5 h-5 text-PowerfulYellow" />
                    </div>
                    <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-white/40 text-sm">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 mb-6 overflow-x-auto pb-2"
          >
            {["all", "applied", "pending", "reviewing", "queued"].map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                  selectedFilter === filter
                    ? "bg-gradient-to-r from-PowerfulYellow to-Secondary text-Primary"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </motion.button>
            ))}
          </motion.div>

          {/* Jobs List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {MOCK_JOBS.filter(
              (job) => selectedFilter === "all" || job.status === selectedFilter
            ).map((job, index) => {
              const StatusIcon = getStatusIcon(job.status);
              const isApplying = applyingJobId === job.id;

              return (
                <motion.div
                  key={job.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01, x: 4 }}
                  className={`relative group ${isApplying ? "ring-2 ring-PowerfulYellow/50" : ""}`}
                >
                  {/* Applying animation overlay */}
                  <AnimatePresence>
                    {isApplying && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-r from-PowerfulYellow/20 to-Secondary/20 rounded-2xl z-10 flex items-center justify-center"
                      >
                        <div className="flex items-center gap-3 px-6 py-3 bg-Primary/80 backdrop-blur-xl rounded-xl">
                          <Loader2 className="w-5 h-5 text-PowerfulYellow animate-spin" />
                          <span className="text-white font-medium">
                            Applying...
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Company Logo */}
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0"
                        style={{ backgroundColor: job.color }}
                      >
                        {job.logo}
                      </div>

                      {/* Job Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-white group-hover:text-PowerfulYellow transition-colors">
                              {job.title}
                            </h3>
                            <div className="flex items-center gap-3 text-white/50 text-sm">
                              <span className="flex items-center gap-1">
                                <Building2 className="w-3.5 h-3.5" />
                                {job.company}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-3.5 h-3.5" />
                                {job.salary}
                              </span>
                            </div>
                          </div>

                          {/* Match Score */}
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <svg className="w-12 h-12 -rotate-90">
                                <circle
                                  cx="24"
                                  cy="24"
                                  r="20"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  className="text-white/10"
                                />
                                <circle
                                  cx="24"
                                  cy="24"
                                  r="20"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  strokeDasharray={`${job.match * 1.25} 125`}
                                  className="text-PowerfulYellow"
                                />
                              </svg>
                              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
                                {job.match}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          {job.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-lg bg-white/5 text-white/60 text-xs border border-white/10"
                            >
                              {tag}
                            </span>
                          ))}
                          <span className="text-white/30 text-xs ml-2">
                            {job.postedAgo}
                          </span>
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex items-center gap-3 lg:flex-col lg:items-end">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusColor(job.status)}`}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          {job.status.charAt(0).toUpperCase() +
                            job.status.slice(1)}
                        </span>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Load More Jobs
            </motion.button>
          </motion.div>

          {/* Pro Feature Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-PowerfulYellow/20 via-Secondary/20 to-PowerfulYellow/20 rounded-3xl" />
            <div className="relative bg-gradient-to-r from-Primary/80 to-BackgroundNavyBlue/80 backdrop-blur-xl border border-PowerfulYellow/30 rounded-3xl p-8 lg:p-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-PowerfulYellow to-Secondary">
                    <Crown className="w-8 h-8 text-Primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      Upgrade to Pro
                    </h3>
                    <p className="text-white/50">
                      Unlimited applications, priority matching & resume
                      customization
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-PowerfulYellow to-Secondary text-Primary font-semibold text-lg hover:shadow-lg hover:shadow-PowerfulYellow/30 transition-all flex items-center gap-2"
                >
                  <Star className="w-5 h-5" />
                  Upgrade Now
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
