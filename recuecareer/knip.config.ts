export default {
  entry: [
    "src/app/layout.tsx",
    "src/app/page.tsx",              // landing
    "src/app/Pricing/**/*.tsx",      // pricing route
    "src/app/getStarted/**/*.tsx",   // the 'getSta...' folder
    "src/app/**/layout.tsx"          // any nested layouts
  ],
  project: ["src/**/*.{ts,tsx}"],
  ignore: [
    "src/app/**/*.{png,jpg,jpeg,svg}",
    "src/styles/**"
  ]
};
