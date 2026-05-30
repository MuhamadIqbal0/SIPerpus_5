// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
 // darkMode: konfigurasi dark mode menggunakan class CSS
 darkMode: ['class'],
 // content: path ke semua file yang menggunakan class Tailwind
 // Tailwind akan scan file ini untuk menentukan class mana yang perlu digenerate
 content: [
 './index.html',
 './src/**/*.{vue,js,ts,jsx,tsx}',
 ],
 theme: {
 extend: {
 // shadcn-vue menggunakan CSS variables untuk theming
 // Nama-nama ini HARUS sama persis dengan yang ada di globals.css
 colors: {
 border: 'hsl(var(--border))',
 input: 'hsl(var(--input))',
 ring: 'hsl(var(--ring))',
 background: 'hsl(var(--background))',
 foreground: 'hsl(var(--foreground))',
 primary: {
 DEFAULT: 'hsl(var(--primary))',
 foreground: 'hsl(var(--primary-foreground))',
 },
 secondary: {
 DEFAULT: 'hsl(var(--secondary))',
 foreground: 'hsl(var(--secondary-foreground))',
 },
 destructive: {
 DEFAULT: 'hsl(var(--destructive))',
 },
 muted: {
 DEFAULT: 'hsl(var(--muted))',
 foreground: 'hsl(var(--muted-foreground))',
 },
 accent: {
 DEFAULT: 'hsl(var(--accent))',
 foreground: 'hsl(var(--accent-foreground))',
 },
 popover: {
 DEFAULT: 'hsl(var(--popover))',
 foreground: 'hsl(var(--popover-foreground))',
 },
 card: {
 DEFAULT: 'hsl(var(--card))',
 foreground: 'hsl(var(--card-foreground))',
 },
 },
 borderRadius: {
 lg: 'var(--radius)',
 md: 'calc(var(--radius) - 2px)',
 sm: 'calc(var(--radius) - 4px)',
 },
 },
 },
 plugins: [],
}

