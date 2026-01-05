"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  BarChart3, 
  Settings, 
  Home,
  Link as LinkIcon,
  Loader2,
  X,
  TrendingUp,
  Code2,
  FileText
} from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ExtractOut = {
  techRequirements: string[];
  generalRequirements: string[];
  error?: string;
};

// ============================================
// MOCK DATA - Replace with actual API call later
// ============================================
const MOCK_CHART_DATA = [
  { skill: "Python", count: 156, fill: "#ffda64" },
  { skill: "JavaScript", count: 134, fill: "#f1f5f9" },
  { skill: "React", count: 98, fill: "#f1f5f9" },
  { skill: "SQL", count: 87, fill: "#f1f5f9" },
  { skill: "AWS", count: 72, fill: "#f1f5f9" },
];

const MOCK_CHART_CONFIG = {
  count: { label: "Job Count" },
  Python: { label: "Python", color: "#ffda64" },
  JavaScript: { label: "JavaScript", color: "#fff2c8" },
  React: { label: "React", color: "#0e2c4d" },
  SQL: { label: "SQL", color: "#1a2238" },
  AWS: { label: "AWS", color: "#f1f5f9" },
} satisfies ChartConfig;
// ============================================

const navItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: Briefcase, label: "Jobs", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 }
};

export default function RequirementsPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [tech, setTech] = useState<string[]>([]);
  const [gen, setGen] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setErr(null); setTech([]); setGen([]);

    try { new URL(url); } catch { setLoading(false); setErr("Enter a valid URL"); return; }

    try {
      const r = await fetch("/api/requirements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data: ExtractOut = await r.json();
      if (!r.ok || data.error) throw new Error(data.error || `HTTP ${r.status}`);
      setTech(data.techRequirements);
      setGen(data.generalRequirements);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Something went wrong";
      setErr(message);
    } finally {
      setLoading(false);
    }
  }

  const hasResults = tech.length > 0 || gen.length > 0;

  return (
    <div className="relative z-10 flex min-h-screen">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -64 }}
        animate={{ x: 0 }}
        className="fixed left-0 top-0 h-full w-16 bg-Primary/10 backdrop-blur-md border-r border-white/5 flex flex-col items-center py-8 gap-8 z-50"
      >
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="w-8 h-8 rounded-lg bg-PowerfulYellow flex items-center justify-center"
        >
          <Briefcase className="w-4 h-4 text-Primary/40" />
        </motion.div>
        
        <nav className="flex flex-col gap-4 mt-8">
          {navItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                item.active 
                  ? "bg-PowerfulYellow/20 text-PowerfulYellow" 
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <item.icon className="w-5 h-5" />
            </motion.button>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 ml-16 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.header 
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-light text-white tracking-tight">
              Job Requirements Extractor
            </h1>
            <p className="text-white/40 text-sm mt-2">
              Extract and analyze job requirements from any listing
            </p>
          </motion.header>

          {/* URL Input Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8"
          >
            <form onSubmit={onSubmit} className="flex gap-4">
              <div className="flex-1 relative">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="url"
                  required
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="Paste job listing URL here..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-PowerfulYellow/50 focus:ring-1 focus:ring-PowerfulYellow/20 transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="px-6 py-3 bg-PowerfulYellow text-Primary font-medium rounded-xl hover:bg-PowerfulYellow/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Extracting...
                  </>
                ) : (
                  "Extract"
                )}
              </motion.button>
            </form>
            
            {err && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-red-400 text-sm"
              >
                {err}
              </motion.p>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setDrawerOpen(true)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 text-sm"
            >
              <BarChart3 className="w-4 h-4" />
              See All Analytics
            </motion.button>
          </motion.div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tech Requirements */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-PowerfulYellow/20 flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-PowerfulYellow" />
                </div>
                <h2 className="text-lg font-medium text-white">Tech Requirements</h2>
                {tech.length > 0 && (
                  <span className="ml-auto px-2 py-1 bg-PowerfulYellow/20 text-PowerfulYellow text-xs rounded-full">
                    {tech.length}
                  </span>
                )}
              </div>
              
              {!hasResults ? (
                <div className="text-center py-12">
                  <Code2 className="w-8 h-8 text-white/20 mx-auto mb-4" />
                  <p className="text-white/40 text-sm">
                    Enter a job URL to extract tech requirements
                  </p>
                </div>
              ) : tech.length > 0 ? (
                <motion.ul 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-2 max-h-80 overflow-y-auto pr-2"
                >
                  {tech.map((t, i) => (
                    <motion.li 
                      key={i}
                      variants={itemVariants}
                      className="px-4 py-3 bg-white/5 rounded-xl text-white/80 text-sm border border-white/5 hover:border-PowerfulYellow/30 transition-colors"
                    >
                      {t}
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <p className="text-white/30 text-center py-8">No tech requirements found</p>
              )}
            </motion.div>

            {/* General Requirements */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-Secondary/20 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-Secondary" />
                </div>
                <h2 className="text-lg font-medium text-white">General Requirements</h2>
                {gen.length > 0 && (
                  <span className="ml-auto px-2 py-1 bg-Secondary/20 text-Secondary text-xs rounded-full">
                    {gen.length}
                  </span>
                )}
              </div>
              
              {!hasResults ? (
                <div className="text-center py-12">
                  <FileText className="w-8 h-8 text-white/20 mx-auto mb-4" />
                  <p className="text-white/40 text-sm">
                    Enter a job URL to extract general requirements
                  </p>
                </div>
              ) : gen.length > 0 ? (
                <motion.ul 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-2 max-h-80 overflow-y-auto pr-2"
                >
                  {gen.map((g, i) => (
                    <motion.li 
                      key={i}
                      variants={itemVariants}
                      className="px-4 py-3 bg-white/5 rounded-xl text-white/80 text-sm border border-white/5 hover:border-Secondary/30 transition-colors"
                    >
                      {g}
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <p className="text-white/30 text-center py-8">No general requirements found</p>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Analytics Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-lg bg-Primary/40 border-l border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Drawer Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-xl font-medium text-white">Requirements Analytics</h2>
                    <p className="text-white/40 text-sm mt-1">Aggregate data from your applications</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setDrawerOpen(false)}
                    className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Pie Chart Card */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-PowerfulYellow/20 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-PowerfulYellow" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Most Common Skills</h3>
                      <p className="text-white/40 text-xs">Across all your applications</p>
                    </div>
                  </div>
                  
                  {/* ============================================
                      CHART - Uses MOCK_CHART_DATA above
                      Replace with actual data from your API
                      ============================================ */}
                  <ChartContainer
                    config={MOCK_CHART_CONFIG}
                    className="mx-auto aspect-square max-h-64"
                  >
                    <PieChart>
                      <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                      <Pie 
                        data={MOCK_CHART_DATA} 
                        dataKey="count" 
                        nameKey="skill"
                        label={({ skill }) => skill}
                        labelLine={false}
                      />
                    </PieChart>
                  </ChartContainer>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-2 gap-4 mb-6"
                >
                  {/* ============================================
                      STATS - Replace these mock values with actual data
                      ============================================ */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-white/40 text-xs mb-1">Total Jobs Analyzed</p>
                    <p className="text-2xl font-light text-white">547</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-white/40 text-xs mb-1">Unique Skills</p>
                    <p className="text-2xl font-light text-white">89</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-white/40 text-xs mb-1">Top Tech Skill</p>
                    <p className="text-lg font-light text-PowerfulYellow">Python</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-white/40 text-xs mb-1">Top General</p>
                    <p className="text-lg font-light text-Secondary">3+ Years Exp</p>
                  </div>
                </motion.div>

                {/* Skill List */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6"
                >
                  <h3 className="text-white font-medium mb-4">Top Requirements</h3>
                  {/* ============================================
                      REQUIREMENTS LIST - Replace with actual data
                      ============================================ */}
                  <ul className="space-y-3">
                    {MOCK_CHART_DATA.map((item, i) => (
                      <li key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.fill }}
                          />
                          <span className="text-white/80 text-sm">{item.skill}</span>
                        </div>
                        <span className="text-white/40 text-sm">{item.count} jobs</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

