import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-blue-600',
    'bg-blue-700',
    'bg-green-600',
    'bg-green-700',
    'bg-purple-600',
    'bg-purple-700',
    'bg-red-600',
    'bg-red-700',
    'bg-gray-600',
    'bg-gray-700',
    'bg-yellow-600',
    'bg-orange-600',
    'text-blue-600',
    'text-green-600',
    'text-purple-600',
    'text-red-600',
    'text-gray-600',
    'text-yellow-600',
    'text-orange-600',
    'border-blue-500',
    'border-green-500',
    'border-purple-500',
    'border-red-500',
    'border-gray-300',
    'border-gray-500',
    'ring-blue-500',
    'ring-green-500',
    'ring-purple-500',
    'ring-red-500',
    'ring-gray-500',
  ]
}

export default config
