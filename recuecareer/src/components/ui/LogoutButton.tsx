"use client";

export default function LogoutButton() {
  return (
    <a
      href="/auth/logout"
      className="inline-block px-6 py-3 text-lg font-semibold rounded-xl bg-white/20 text-white border border-white/30 hover:bg-white/30 transition-colors"
    >
      Log Out
    </a>
  );
}