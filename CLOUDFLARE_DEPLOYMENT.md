# Cloudflare Pages Deployment Guide for Golden Freezer Blog

## ⚠️ Important Configuration Changes

This project has been updated to use **standard Next.js static export** instead of Cloudflare's Next-on-Pages adapter:

### What Changed:
1. **Removed** `@cloudflare/next-on-pages` - not needed for static export
2. **Build command** changed from `npx @cloudflare/next-on-pages@1` to `npm run build`
3. **Output directory** remains as `out`
4. **Next.js config** uses `output: 'export'` for static generation
5. **Images** are unoptimized (required for static export)
6. **CSS imports** updated from `@import "tailwindcss"` to `@tailwind` directives
7. **Functions directory** renamed to prevent edge runtime detection

### Key Files:
- `.pages.yml` - Overrides Cloudflare's auto-detection
- `next.config.ts` - Configured for static export
- `wrangler.toml` - Points to `out` directory

## 🚀 Quick Setup

### Prerequisites
- Cloudflare account
- GitHub repository: https://github.com/Golden-Freezer/goldenf
- Node.js 18+ installed locally

### 1. Initial Cloudflare Pages Setup

1. **Connect to Cloudflare Pages:**
   ```bash
   # Install Wrangler CLI
   npm install -g wrangler
   
   # Login to Cloudflare
   wrangler login
   ```

2. **Create Pages Project:**
   - Go to Cloudflare Dashboard → Pages
   - Click "Create a project"
   - Connect to GitHub → Select `Golden-Freezer/goldenf`
   - Project name: `goldenf-blog`

### 2. Build Configuration

**Framework preset:** None (Static HTML Export)

**Build settings:**
- Build command: `npm run build`
- Build output directory: `out`
- Root directory: `/`
- Node.js version: `20`

**Important:** DO NOT use the Next.js preset or `@cloudflare/next-on-pages`. This project uses standard Next.js static export.

### 3. Environment Variables

Set these in Cloudflare Pages → Settings → Environment Variables:

```bash
# Production Environment
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://goldenf.pages.dev

# Supabase (Update with your actual values)
NEXT_PUBLIC_SUPABASE_URL=https://jvlfkotlaiddirjkdxwo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.jvlfkotlaiddirjkdxwo.supabase.co:5432/postgres

# NextAuth
NEXTAUTH_URL=https://goldenf.pages.dev
NEXTAUTH_SECRET=your-production-secret-32-chars-min

# Google Services (Korean SEO)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Korean Optimization
NEXT_PUBLIC_LOCALE=ko
NEXT_PUBLIC_DEFAULT_LANG=ko
NEXT_PUBLIC_TIMEZONE=Asia/Seoul
```

### 4. Custom Domain Setup (Optional)

1. **Add Custom Domain:**
   - Pages → goldenf-blog → Custom domains
   - Add your domain (e.g., `goldenf.com`)
   - Update DNS records as instructed

2. **SSL/TLS Configuration:**
   - Enable "Always Use HTTPS"
   - Set SSL/TLS encryption mode to "Full (strict)"

### 5. Performance Optimization

**Cloudflare Settings:**
```bash
# Speed → Optimization
- Auto Minify: HTML, CSS, JS ✓
- Brotli Compression ✓
- Early Hints ✓

# Caching → Configuration
- Browser Cache TTL: 1 year
- Always Online ✓

# Korean Content Optimization
- Argo Smart Routing ✓ (for better performance in Korea)
- Polish: WebP conversion ✓
```

### 6. Security Configuration

**Security Headers** (automatically applied via `_headers` file):
- CSP, HSTS, X-Frame-Options
- Korean-specific bot handling

**Access Control:**
- Admin routes protected via Functions
- API rate limiting enabled

### 7. Deployment Process

**Automatic Deployment:**
```bash
# Push to main branch triggers deployment
git add .
git commit -m "Deploy to Cloudflare Pages"
git push origin main
```

**Manual Deployment:**
```bash
# Local build and test
npm run build
npx serve out

# Deploy using Wrangler
npm run deploy

# Preview deployment locally
npm run preview
```

## 📊 Korean SEO Optimization

### Search Engine Integration

1. **Google Search Console:**
   - Verify domain with `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
   - Submit sitemap: `https://goldenf.pages.dev/sitemap.xml`

2. **Naver Search Advisor:**
   - Add site verification
   - Submit sitemap for Korean content

3. **Daum Search:**
   - Register site for Korean search optimization

### Performance Monitoring

**Cloudflare Analytics:**
- Page views and unique visitors
- Core Web Vitals
- Security events

**Korean-specific Metrics:**
- Seoul/Korea performance data
- Korean search bot crawling
- Hangul content indexing

## 🔧 Troubleshooting

### Common Issues

1. **Build Failures:**
   ```bash
   # Check build locally
   npm run build
   npm run type-check
   
   # Clean cache if needed
   rm -rf .next out
   npm ci
   npm run build
   ```

2. **Environment Variables:**
   - Ensure all required vars are set
   - Check for typos in variable names
   - Verify Supabase credentials

3. **Korean Font Loading:**
   - Fonts are cached via Cloudflare CDN
   - Fallback fonts configured for Korean text

4. **API Route Issues:**
   - Functions middleware handles CORS
   - Check environment variables in Functions

### Performance Optimization

```bash
# Analyze bundle size
npm run analyze

# Check Core Web Vitals
npx lighthouse https://goldenf.pages.dev --locale=ko

# Korean content optimization
npx next-bundle-analyzer
```

## 🚦 CI/CD Pipeline

**GitHub Actions** (`.github/workflows/cloudflare-pages.yml`):
- Security scanning
- Type checking
- Automated deployment
- Lighthouse audits
- Cache purging

**Workflow Triggers:**
- Push to `main` → Production deployment
- Push to `develop` → Preview deployment
- Pull requests → Preview builds

## 📈 Monitoring & Alerts

**Set up monitoring for:**
- Site uptime (Korean region)
- Performance metrics
- Security events
- Error rates
- Supabase database performance

**Recommended alerts:**
- Deploy failures
- Performance degradation
- Security incidents
- High error rates

## 🔐 Security Checklist

- [x] HTTPS enforced
- [x] Security headers configured
- [x] Admin routes protected
- [x] API rate limiting
- [x] Environment variables secured
- [x] CORS properly configured
- [x] CSP policy implemented

## 📝 Next Steps

1. Set up custom domain
2. Configure Korean SEO tools
3. Set up monitoring alerts
4. Optimize for Core Web Vitals
5. Implement error tracking
6. Set up backup strategy

---

**Support:**
- Cloudflare Pages Documentation
- Next.js on Cloudflare Guide
- Korean SEO Best Practices