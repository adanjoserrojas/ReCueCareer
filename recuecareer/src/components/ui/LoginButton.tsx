"use client";

export default function LoginButton() {
  return (
    <a
      href="/auth/login?returnTo=/myExperience"
      className="inline-block px-8 py-4 text-2xl font-bold rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
    >
      Log In
    </a>
  );
}