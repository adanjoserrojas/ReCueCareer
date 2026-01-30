"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  TrendingUp,
  Target,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Zap,
  FileText,
  Send,
  Eye,
  Calendar,
  MapPin,
  Building2,
  ChevronRight,
  Bell,
  Search,
  Filter,
  MoreHorizontal,
  Play,
  Star,
  Trophy,
  Flame,
  Activity,
} from "lucide-react";
import DashboardNavBar from "@/components/ui/dashboard-nav-bar";

// Mock data
const QUICK_STATS = [
  {
    label: "Total Applications",
    value: "247",
    change: "+23",
    trend: "up",
    icon: Send,
    color: "from-blue-500 to-cyan-500",
  },
  {
    label: "Interview Rate",
    value: "18%",
    change: "+4.2%",
    trend: "up",
    icon: Target,
    color: "from-PowerfulYellow to-Secondary",
  },
  {
    label: "Active Applications",
    value: "34",
    change: "+8",
    trend: "up",
    icon: Activity,
    color: "from-green-500 to-emerald-500",
  },
  {
    label: "Avg Response Time",
    value: "3.2d",
    change: "-0.8d",
    trend: "up",
    icon: Clock,
    color: "from-purple-500 to-pink-500",
  },
];

const RECENT_APPLICATIONS = [
  {
    id: 1,
    company: "Google",
    role: "Senior Software Engineer",
    status: "Interview Scheduled",
    statusColor: "text-green-400 bg-green-400/10",
    date: "Today",
    logo: "G",
    logoColor: "#4285F4",
  },
  {
    id: 2,
    company: "Stripe",
    role: "Full Stack Developer",
    status: "Under Review",
    statusColor: "text-blue-400 bg-blue-400/10",
    date: "Yesterday",
    logo: "S",
    logoColor: "#635BFF",
  },
  {
    id: 3,
    company: "Airbnb",
    role: "Frontend Engineer",
    status: "Applied",
    statusColor: "text-yellow-400 bg-yellow-400/10",
    date: "2 days ago",
    logo: "A",
    logoColor: "#FF5A5F",
  },
  {
    id: 4,
    company: "Netflix",
    role: "Software Engineer II",
    status: "Applied",
    statusColor: "text-yellow-400 bg-yellow-400/10",
    date: "3 days ago",
    logo: "N",
    logoColor: "#E50914",
  },
];

const UPCOMING_INTERVIEWS = [
  {
    id: 1,
    company: "Google",
    role: "Senior Software Engineer",
    type: "Technical Round",
    date: "Tomorrow",
    time: "2:00 PM PST",
    logo: "G",
    logoColor: "#4285F4",
  },
  {
    id: 2,
    company: "Meta",
    role: "Product Engineer",
    type: "System Design",
    date: "Feb 2",
    time: "10:00 AM PST",
    logo: "M",
    logoColor: "#0668E1",
  },
];

const WEEKLY_ACTIVITY = [
  { day: "Mon", applications: 12, interviews: 1 },
  { day: "Tue", applications: 8, interviews: 0 },
  { day: "Wed", applications: 15, interviews: 2 },
  { day: "Thu", applications: 6, interviews: 1 },
  { day: "Fri", applications: 18, interviews: 0 },
  { day: "Sat", applications: 4, interviews: 0 },
  { day: "Sun", applications: 2, interviews: 0 },
];

const TOP_SKILLS = [
  { name: "React", demand: 94, trend: "up" },
  { name: "TypeScript", demand: 89, trend: "up" },
  { name: "Node.js", demand: 82, trend: "stable" },
  { name: "Python", demand: 78, trend: "up" },
  { name: "AWS", demand: 71, trend: "up" },
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

export default function DashboardPage() {
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  });

  const maxApplications = Math.max(...WEEKLY_ACTIVITY.map((d) => d.applications));

  return (
    <div className="min-h-screen w-full">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-PowerfulYellow/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-Secondary/5 rounded-full blur-3xl" />
      </div>

      <DashboardNavBar />

      <main className="relative pt-24 lg:pt-28 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl lg:text-4xl font-bold text-white">
                  {greeting}, Alex
                </h1>
                <motion.div
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-3xl"
                >
                  👋
                </motion.div>
              </div>
              <p className="text-white/50">
                Here&apos;s what&apos;s happening with your job search today.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-PowerfulYellow to-Secondary text-Primary font-semibold hover:shadow-lg hover:shadow-PowerfulYellow/20 transition-all"
                
              >
                <a className="absolute inset-0" href="/autoApply"/>
                <Play className="w-4 h-4" />
                Start Auto Apply
              </motion.button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {QUICK_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity blur-xl`}
                />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color}`}
                    >
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div
                      className={`flex items-center gap-1 text-xs font-medium ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}
                    >
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-white/40 text-sm">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Activity Chart & Recent Applications */}
            <div className="lg:col-span-2 space-y-6">
              {/* Weekly Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Weekly Activity
                    </h2>
                    <p className="text-white/40 text-sm">
                      Your application activity this week
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-PowerfulYellow" />
                      <span className="text-white/60">Applications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                      <span className="text-white/60">Interviews</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-end justify-between gap-2 h-48">
                  {WEEKLY_ACTIVITY.map((day, i) => (
                    <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex flex-col items-center gap-1 h-40 justify-end">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{
                            height: `${(day.applications / maxApplications) * 100}%`,
                          }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                          className="w-full max-w-[40px] bg-gradient-to-t from-PowerfulYellow/50 to-PowerfulYellow rounded-t-lg relative group cursor-pointer"
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/10 backdrop-blur-xl rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {day.applications} apps
                          </div>
                        </motion.div>
                        {day.interviews > 0 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                            className="w-3 h-3 bg-green-400 rounded-full"
                          />
                        )}
                      </div>
                      <span className="text-white/40 text-xs">{day.day}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Applications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Recent Applications
                    </h2>
                    <p className="text-white/40 text-sm">
                      Track your latest job applications
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-PowerfulYellow hover:text-Secondary transition-colors flex items-center gap-1"
                  >
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="space-y-3">
                  {RECENT_APPLICATIONS.map((app, i) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer group"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                        style={{ backgroundColor: app.logoColor }}
                      >
                        {app.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate group-hover:text-PowerfulYellow transition-colors">
                          {app.role}
                        </h3>
                        <p className="text-white/50 text-sm">{app.company}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${app.statusColor}`}
                        >
                          {app.status}
                        </span>
                        <p className="text-white/30 text-xs mt-1">{app.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Interviews & Skills */}
            <div className="space-y-6">
              {/* Upcoming Interviews */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white">
                    Upcoming Interviews
                  </h2>
                  <span className="px-2 py-1 rounded-full bg-green-400/20 text-green-400 text-xs font-medium">
                    {UPCOMING_INTERVIEWS.length} scheduled
                  </span>
                </div>

                <div className="space-y-4">
                  {UPCOMING_INTERVIEWS.map((interview, i) => (
                    <motion.div
                      key={interview.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="relative p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-PowerfulYellow/30 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold shrink-0"
                          style={{ backgroundColor: interview.logoColor }}
                        >
                          {interview.logo}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium text-sm group-hover:text-PowerfulYellow transition-colors">
                            {interview.company}
                          </h3>
                          <p className="text-white/50 text-xs">{interview.role}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="px-2 py-0.5 rounded bg-white/10 text-white/60 text-xs">
                              {interview.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                        <Calendar className="w-3.5 h-3.5 text-PowerfulYellow" />
                        <span className="text-white/60 text-xs">
                          {interview.date} at {interview.time}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
                >
                  View Calendar
                </motion.button>
              </motion.div>

              {/* Top Skills in Demand */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white">
                    Skills in Demand
                  </h2>
                  <Sparkles className="w-5 h-5 text-PowerfulYellow" />
                </div>

                <div className="space-y-4">
                  {TOP_SKILLS.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm font-medium">
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-white/60 text-xs">
                            {skill.demand}%
                          </span>
                          {skill.trend === "up" && (
                            <TrendingUp className="w-3 h-3 text-green-400" />
                          )}
                        </div>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.demand}%` }}
                          transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-PowerfulYellow to-Secondary rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Achievement Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="relative overflow-hidden bg-gradient-to-br from-PowerfulYellow/20 to-Secondary/20 border border-PowerfulYellow/30 rounded-2xl p-6"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-PowerfulYellow/20 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-PowerfulYellow/20">
                      <Trophy className="w-5 h-5 text-PowerfulYellow" />
                    </div>
                    <span className="text-PowerfulYellow font-medium text-sm">
                      Weekly Achievement
                    </span>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    On Fire! 🔥
                  </h3>
                  <p className="text-white/60 text-sm">
                    You&apos;ve applied to 65 jobs this week. That&apos;s 40% more than
                    last week!
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-white/80 text-sm font-medium">
                      7 day streak
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
