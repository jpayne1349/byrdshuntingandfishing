module.exports = {
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-svelte"], // Ensure the Svelte plugin is included
  printWidth: 80,
  htmlWhitespaceSensitivity: "ignore", // This works for Svelte
};
