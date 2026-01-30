"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Bell,
  CreditCard,
  Shield,
  Palette,
  Globe,
  Smartphone,
  ChevronRight,
  Check,
  Upload,
  Camera,
  Briefcase,
  FileText,
  Link as LinkIcon,
  Github,
  Linkedin,
  Twitter,
  Moon,
  Sun,
  Monitor,
  Zap,
  Crown,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
  Save,
  Download,
  Trash2,
  LogOut,
} from "lucide-react";
import DashboardNavBar from "@/components/ui/dashboard-nav-bar";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "account", label: "Account", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "preferences", label: "Preferences", icon: Palette },
  { id: "integrations", label: "Integrations", icon: LinkIcon },
];

const NOTIFICATION_SETTINGS = [
  {
    id: "email_applications",
    label: "Application Updates",
    description: "Get notified when your application status changes",
    enabled: true,
  },
  {
    id: "email_interviews",
    label: "Interview Reminders",
    description: "Receive reminders before scheduled interviews",
    enabled: true,
  },
  {
    id: "email_matches",
    label: "New Job Matches",
    description: "Get alerts when new jobs match your profile",
    enabled: false,
  },
  {
    id: "email_weekly",
    label: "Weekly Summary",
    description: "Receive a weekly digest of your job search activity",
    enabled: true,
  },
  {
    id: "push_all",
    label: "Push Notifications",
    description: "Enable push notifications on your devices",
    enabled: true,
  },
];

const INTEGRATIONS = [
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    description: "Import your profile and apply with one click",
    connected: true,
    color: "#0A66C2",
  },
  {
    id: "github",
    name: "GitHub",
    icon: Github,
    description: "Showcase your repositories and contributions",
    connected: true,
    color: "#333",
  },
  {
    id: "google",
    name: "Google",
    icon: Mail,
    description: "Sync your calendar and import contacts",
    connected: false,
    color: "#4285F4",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState(NOTIFICATION_SETTINGS);
  const [theme, setTheme] = useState("dark");
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  return (
    <div className="min-h-screen w-full">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-PowerfulYellow/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-32 w-96 h-96 bg-Secondary/10 rounded-full blur-3xl" />
      </div>

      <DashboardNavBar />

      <main className="relative pt-24 lg:pt-28 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Settings
            </h1>
            <p className="text-white/50">
              Manage your account settings and preferences
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-64 shrink-0"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2">
                {TABS.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-PowerfulYellow/20 to-Secondary/10 text-white border border-PowerfulYellow/30"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <tab.icon
                      className={`w-5 h-5 ${activeTab === tab.id ? "text-PowerfulYellow" : ""}`}
                    />
                    <span className="font-medium">{tab.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Pro Banner */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 p-4 bg-gradient-to-br from-PowerfulYellow/20 to-Secondary/20 border border-PowerfulYellow/30 rounded-2xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-PowerfulYellow" />
                  <span className="text-white font-semibold">Upgrade to Pro</span>
                </div>
                <p className="text-white/60 text-sm mb-3">
                  Unlock unlimited applications and premium features
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-PowerfulYellow to-Secondary text-Primary font-semibold text-sm"
                >
                  Upgrade Now
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1"
            >
              <AnimatePresence mode="wait">
                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <motion.div
                    key="profile"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Avatar Section */}
                    <motion.div
                      variants={itemVariants}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                    >
                      <h2 className="text-lg font-semibold text-white mb-6">
                        Profile Picture
                      </h2>
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-PowerfulYellow to-Secondary flex items-center justify-center text-Primary text-3xl font-bold">
                            A
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute -bottom-2 -right-2 p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
                          >
                            <Camera className="w-4 h-4" />
                          </motion.button>
                        </div>
                        <div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors text-sm font-medium flex items-center gap-2"
                          >
                            <Upload className="w-4 h-4" />
                            Upload Photo
                          </motion.button>
                          <p className="text-white/40 text-xs mt-2">
                            JPG, PNG or GIF. Max 2MB.
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Personal Info */}
                    <motion.div
                      variants={itemVariants}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                    >
                      <h2 className="text-lg font-semibold text-white mb-6">
                        Personal Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">
                            First Name
                          </label>
                          <input
                            type="text"
                            defaultValue="Alex"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-PowerfulYellow/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">
                            Last Name
                          </label>
                          <input
                            type="text"
                            defaultValue="Johnson"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-PowerfulYellow/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">
                            Email
                          </label>
                          <input
                            type="email"
                            defaultValue="alex@example.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-PowerfulYellow/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">
                            Phone
                          </label>
                          <input
                            type="tel"
                            defaultValue="+1 (555) 123-4567"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-PowerfulYellow/50 transition-colors"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-white/60 text-sm mb-2 block">
                            Bio
                          </label>
                          <textarea
                            rows={3}
                            defaultValue="Full-stack developer with 5+ years of experience..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-PowerfulYellow/50 transition-colors resize-none"
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Professional Info */}
                    <motion.div
                      variants={itemVariants}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                    >
                      <h2 className="text-lg font-semibold text-white mb-6">
                        Professional Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">
                            Job Title
                          </label>
                          <input
                            type="text"
                            defaultValue="Senior Software Engineer"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-PowerfulYellow/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">
                            Company
                          </label>
                          <input
                            type="text"
                            defaultValue="Tech Corp"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-PowerfulYellow/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">
                            Location
                          </label>
                          <input
                            type="text"
                            defaultValue="San Francisco, CA"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-PowerfulYellow/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">
                            Website
                          </label>
                          <input
                            type="url"
                            defaultValue="https://alexjohnson.dev"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-PowerfulYellow/50 transition-colors"
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Save Button */}
                    <motion.div variants={itemVariants} className="flex justify-end">
                      <motion.button
                        onClick={handleSave}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={saving}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-PowerfulYellow to-Secondary text-Primary font-semibold flex items-center gap-2 disabled:opacity-50"
                      >
                        {saving ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Save className="w-4 h-4" />
                            </motion.div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Save Changes
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}

                {/* Account Tab */}
                {activeTab === "account" && (
                  <motion.div
                    key="account"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Change Password */}
                    <motion.div
                      variants={itemVariants}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                    >
                      <h2 className="text-lg font-semibold text-white mb-6">
                        Change Password
                      </h2>
                      <div className="space-y-4 max-w-md">
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white focus:outline-none focus:border-PowerfulYellow/50 transition-colors"
                            />
                            <button
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-PowerfulYellow/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-PowerfulYellow/50 transition-colors"
                          />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-colors"
                        >
                          Update Password
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Two-Factor Auth */}
                    <motion.div
                      variants={itemVariants}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-xl bg-green-500/20">
                            <Shield className="w-6 h-6 text-green-400" />
                          </div>
                          <div>
                            <h2 className="text-lg font-semibold text-white">
                              Two-Factor Authentication
                            </h2>
                            <p className="text-white/50 text-sm mt-1">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-green-400/20 text-green-400 text-xs font-medium">
                          Enabled
                        </span>
                      </div>
                    </motion.div>

                    {/* Danger Zone */}
                    <motion.div
                      variants={itemVariants}
                      className="bg-red-500/5 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6"
                    >
                      <h2 className="text-lg font-semibold text-red-400 mb-4">
                        Danger Zone
                      </h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                          <div>
                            <p className="text-white font-medium">Export Data</p>
                            <p className="text-white/50 text-sm">
                              Download all your data as a JSON file
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Export
                          </motion.button>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                          <div>
                            <p className="text-white font-medium">Delete Account</p>
                            <p className="text-white/50 text-sm">
                              Permanently delete your account and all data
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <motion.div
                    key="notifications"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <motion.div
                      variants={itemVariants}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                    >
                      <h2 className="text-lg font-semibold text-white mb-6">
                        Notification Preferences
                      </h2>
                      <div className="space-y-4">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                          >
                            <div>
                              <p className="text-white font-medium">
                                {notification.label}
                              </p>
                              <p className="text-white/50 text-sm">
                                {notification.description}
                              </p>
                            </div>
                            <motion.button
                              onClick={() => toggleNotification(notification.id)}
                              whileTap={{ scale: 0.9 }}
                              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                                notification.enabled
                                  ? "bg-PowerfulYellow"
                                  : "bg-white/20"
                              }`}
                            >
                              <motion.div
                                animate={{ x: notification.enabled ? 20 : 0 }}
                                className="w-5 h-5 rounded-full bg-white shadow-md"
                              />
                            </motion.button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Billing Tab */}
                {activeTab === "billing" && (
                  <motion.div
                    key="billing"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Current Plan */}
                    <motion.div
                      variants={itemVariants}
                      className="bg-gradient-to-br from-PowerfulYellow/20 to-Secondary/20 border border-PowerfulYellow/30 rounded-2xl p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-5 h-5 text-PowerfulYellow" />
                            <span className="text-PowerfulYellow font-semibold">
                              Free Plan
                            </span>
                          </div>
                          <p className="text-white/60 text-sm mb-4">
                            You&apos;re currently on the free plan with limited features
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-white/60">
                              <span className="text-white font-semibold">15</span>/50
                              applications this month
                            </span>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3 rounded-xl bg-gradient-to-r from-PowerfulYellow to-Secondary text-Primary font-semibold flex items-center gap-2"
                        >
                          <Crown className="w-4 h-4" />
                          Upgrade to Pro
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Plan Comparison */}
                    <motion.div
                      variants={itemVariants}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {/* Free Plan */}
                      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Free</h3>
                        <p className="text-3xl font-bold text-white mb-4">
                          $0<span className="text-white/40 text-sm">/month</span>
                        </p>
                        <ul className="space-y-3">
                          {[
                            "50 applications/month",
                            "Basic job matching",
                            "Email support",
                          ].map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-white/60 text-sm">
                              <Check className="w-4 h-4 text-green-400" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pro Plan */}
                      <div className="bg-gradient-to-br from-PowerfulYellow/10 to-Secondary/10 border border-PowerfulYellow/30 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-PowerfulYellow/20 text-PowerfulYellow text-xs font-medium">
                          Popular
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Pro</h3>
                        <p className="text-3xl font-bold text-white mb-4">
                          $29<span className="text-white/40 text-sm">/month</span>
                        </p>
                        <ul className="space-y-3">
                          {[
                            "Unlimited applications",
                            "AI-powered matching",
                            "Resume optimization",
                            "Priority support",
                            "Analytics dashboard",
                          ].map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-white/80 text-sm">
                              <Check className="w-4 h-4 text-PowerfulYellow" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>

                    {/* Payment Method */}
                    <motion.div
                      variants={itemVariants}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                    >
                      <h2 className="text-lg font-semibold text-white mb-6">
                        Payment Method
                      </h2>
                      <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-white/10">
                            <CreditCard className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium">No payment method</p>
                            <p className="text-white/50 text-sm">
                              Add a card to upgrade your plan
                            </p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                        >
                          Add Card
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Preferences Tab */}
                {activeTab === "preferences" && (
                  <motion.div
                    key="preferences"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Theme */}
                    <motion.div
                      variants={itemVariants}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                    >
                      <h2 className="text-lg font-semibold text-white mb-6">Theme</h2>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { id: "light", icon: Sun, label: "Light" },
                          { id: "dark", icon: Moon, label: "Dark" },
                          { id: "system", icon: Monitor, label: "System" },
                        ].map((option) => (
                          <motion.button
                            key={option.id}
                            onClick={() => setTheme(option.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 rounded-xl border transition-all ${
                              theme === option.id
                                ? "bg-PowerfulYellow/20 border-PowerfulYellow/50 text-white"
                                : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            <option.icon className="w-6 h-6 mx-auto mb-2" />
                            <span className="text-sm font-medium">{option.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>

                    {/* Language & Region */}
                    <motion.div
                      variants={itemVariants}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                    >
                      <h2 className="text-lg font-semibold text-white mb-6">
                        Language & Region
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">
                            Language
                          </label>
                          <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-PowerfulYellow/50 transition-colors appearance-none cursor-pointer">
                            <option value="en">English (US)</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">
                            Timezone
                          </label>
                          <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-PowerfulYellow/50 transition-colors appearance-none cursor-pointer">
                            <option value="pst">Pacific Time (PST)</option>
                            <option value="est">Eastern Time (EST)</option>
                            <option value="utc">UTC</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Integrations Tab */}
                {activeTab === "integrations" && (
                  <motion.div
                    key="integrations"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <motion.div
                      variants={itemVariants}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                    >
                      <h2 className="text-lg font-semibold text-white mb-6">
                        Connected Apps
                      </h2>
                      <div className="space-y-4">
                        {INTEGRATIONS.map((integration) => (
                          <div
                            key={integration.id}
                            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className="p-3 rounded-xl"
                                style={{ backgroundColor: integration.color + "20" }}
                              >
                                <integration.icon
                                  className="w-6 h-6"
                                  style={{ color: integration.color }}
                                />
                              </div>
                              <div>
                                <p className="text-white font-medium">
                                  {integration.name}
                                </p>
                                <p className="text-white/50 text-sm">
                                  {integration.description}
                                </p>
                              </div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                integration.connected
                                  ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                  : "bg-white/10 text-white hover:bg-white/20"
                              }`}
                            >
                              {integration.connected ? "Connected" : "Connect"}
                            </motion.button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
