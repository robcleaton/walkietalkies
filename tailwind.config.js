// Tailwind build config (was inline in index.html for the CDN script).
// `npm run build:css` scans the files below for class names and writes
// only the CSS they use to build/tailwind.css.
module.exports = {
  content: ['./index.html', './src/**/*.js', './scripts/build-pages.js'],
  theme: {
    extend: {
      colors: {
        ground: 'var(--ground)', surface: 'var(--surface)', raised: 'var(--raised)',
        ink: 'var(--ink)', muted: 'var(--muted)', faint: 'var(--faint)',
        rule: 'var(--rule)', plaque: 'var(--plaque)', verdigris: 'var(--verdigris)',
        brass: 'var(--brass)', plaquesoft: 'var(--plaque-soft)',
        tomato: 'var(--tomato)', violet: 'var(--violet)', bubblegum: 'var(--bubblegum)', marigold: 'var(--marigold)'
      },
      fontFamily: {
        display: ['"Gasoek One"', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['"Azeret Mono"', 'ui-monospace', 'Menlo', 'monospace'],
        // Body copy (descriptions, area intros/history) — UI text stays Inter.
        serif: ['Newsreader', 'Georgia', 'Times New Roman', 'serif']
      }
    }
  }
};
