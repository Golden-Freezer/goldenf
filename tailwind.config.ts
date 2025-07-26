import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary-solid)",
          foreground: "var(--primary-foreground)",
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent-solid)",
          foreground: "var(--accent-foreground)",
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff', 
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        info: "var(--info)",
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Pretendard', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        korean: ['Pretendard', 'var(--font-geist-sans)', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)", 
        sm: "var(--radius-sm)",
        xl: "var(--radius-xl)",
        '2xl': "var(--radius-2xl)",
        '3xl': "var(--radius-3xl)",
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'DEFAULT': 'var(--shadow)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce': 'bounce 1s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin': 'spin 1s linear infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        fadeInDown: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        slideInLeft: {
          '0%': { 
            opacity: '0',
            transform: 'translateX(-30px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0)'
          },
        },
        slideInRight: {
          '0%': { 
            opacity: '0',
            transform: 'translateX(30px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0)'
          },
        },
        scaleIn: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)'
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)'
          },
        },
        pulse: {
          '50%': {
            opacity: '.5',
          },
        },
        spin: {
          'to': {
            transform: 'rotate(360deg)',
          },
        },
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--foreground)',
            fontFamily: 'Pretendard, var(--font-geist-sans), system-ui, sans-serif',
            lineHeight: '1.8',
            fontSize: '1.125rem',
            '--tw-prose-body': 'var(--foreground-secondary)',
            '--tw-prose-headings': 'var(--foreground)',
            '--tw-prose-lead': 'var(--foreground-secondary)',
            '--tw-prose-links': 'var(--primary-solid)',
            '--tw-prose-bold': 'var(--foreground)',
            '--tw-prose-counters': 'var(--foreground-muted)',
            '--tw-prose-bullets': 'var(--primary-solid)',
            '--tw-prose-hr': 'var(--border)',
            '--tw-prose-quotes': 'var(--foreground)',
            '--tw-prose-quote-borders': 'var(--primary-solid)',
            '--tw-prose-captions': 'var(--foreground-muted)',
            '--tw-prose-code': 'var(--foreground)',
            '--tw-prose-pre-code': 'var(--foreground)',
            '--tw-prose-pre-bg': 'var(--background-tertiary)',
            '--tw-prose-th-borders': 'var(--border)',
            '--tw-prose-td-borders': 'var(--border)',
            a: {
              color: 'var(--primary-solid)',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 150ms ease',
              '&:hover': {
                color: 'var(--primary-hover)',
                textDecoration: 'underline',
              },
            },
            h1: {
              color: 'var(--foreground)',
              fontWeight: '800',
              fontSize: '2.25rem',
              lineHeight: '1.1',
              marginBottom: '1.5rem',
            },
            h2: {
              color: 'var(--foreground)',
              fontWeight: '700',
              fontSize: '1.875rem',
              lineHeight: '1.2',
              marginTop: '3rem',
              marginBottom: '1rem',
              position: 'relative',
              paddingLeft: '1rem',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: '0',
                top: '0',
                bottom: '0',
                width: '4px',
                background: 'var(--primary)',
                borderRadius: '9999px',
              },
            },
            h3: {
              color: 'var(--foreground)',
              fontWeight: '600',
              fontSize: '1.5rem',
              lineHeight: '1.3',
              marginTop: '2rem',
              marginBottom: '0.75rem',
            },
            h4: {
              color: 'var(--foreground)',
              fontWeight: '600',
              fontSize: '1.25rem',
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
            },
            p: {
              marginBottom: '1.5rem',
              color: 'var(--foreground-secondary)',
            },
            blockquote: {
              borderLeftColor: 'var(--primary-solid)',
              borderLeftWidth: '4px',
              paddingLeft: '1.5rem',
              margin: '2rem 0',
              background: 'var(--background-secondary)',
              borderRadius: '0 0.75rem 0.75rem 0',
              fontStyle: 'italic',
              color: 'var(--foreground-secondary)',
              position: 'relative',
              padding: '1rem 1.5rem',
              '&::before': {
                content: '"\\201C"',
                position: 'absolute',
                top: '-10px',
                left: '1rem',
                fontSize: '2.25rem',
                color: 'var(--primary-solid)',
                fontWeight: '700',
              },
            },
            code: {
              color: 'var(--foreground)',
              backgroundColor: 'var(--background-secondary)',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
              fontSize: '0.875em',
              fontWeight: '500',
              border: '1px solid var(--border)',
              '&::before': {
                content: 'none',
              },
              '&::after': {
                content: 'none',
              },
            },
            pre: {
              backgroundColor: 'var(--background-tertiary)',
              border: '1px solid var(--border)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              margin: '2rem 0',
              overflowX: 'auto',
              fontSize: '0.875rem',
              lineHeight: '1.6',
              code: {
                backgroundColor: 'transparent',
                border: 'none',
                padding: '0',
                fontSize: 'inherit',
              },
            },
            'ul, ol': {
              margin: '1.5rem 0',
              paddingLeft: '1.5rem',
            },
            li: {
              marginBottom: '0.5rem',
              color: 'var(--foreground-secondary)',
              '&::marker': {
                color: 'var(--primary-solid)',
                fontWeight: '600',
              },
            },
            strong: {
              color: 'var(--foreground)',
              fontWeight: '600',
            },
            em: {
              color: 'var(--foreground-secondary)',
              fontStyle: 'italic',
            },
            table: {
              width: '100%',
              marginTop: '2rem',
              marginBottom: '2rem',
              borderCollapse: 'collapse',
            },
            th: {
              backgroundColor: 'var(--background-secondary)',
              padding: '0.75rem 1rem',
              textAlign: 'left',
              fontWeight: '600',
              color: 'var(--foreground)',
              borderBottomWidth: '1px',
              borderBottomColor: 'var(--border)',
            },
            td: {
              padding: '0.75rem 1rem',
              borderBottomWidth: '1px',
              borderBottomColor: 'var(--border)',
            },
            img: {
              borderRadius: '0.75rem',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            hr: {
              borderColor: 'var(--border)',
              marginTop: '3rem',
              marginBottom: '3rem',
            },
          },
        },
        sm: {
          css: {
            fontSize: '1rem',
            h1: {
              fontSize: '1.875rem',
            },
            h2: {
              fontSize: '1.5rem',
            },
            h3: {
              fontSize: '1.25rem',
            },
          },
        },
        lg: {
          css: {
            fontSize: '1.25rem',
            h1: {
              fontSize: '2.5rem',
            },
            h2: {
              fontSize: '2rem',
            },
            h3: {
              fontSize: '1.75rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;