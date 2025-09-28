// Performance Optimization Configuration for Vercel
// This file contains various optimization strategies for better performance

export const performanceConfig = {
  // Image optimization
  images: {
    // Enable modern image formats
    formats: ['image/webp', 'image/avif'],
    // Device-specific sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enable placeholder blur
    placeholder: 'blur',
    // Minimum cache TTL
    minimumCacheTTL: 60,
  },

  // Bundle optimization
  bundle: {
    // Enable code splitting
    codeSplitting: true,
    // Optimize package imports
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-*',
      'framer-motion',
      'recharts',
      'react-hook-form',
      'zustand',
      'axios',
      'date-fns',
      'clsx',
      'tailwind-merge'
    ],
    // External dependencies for server-side
    externals: [
      'socket.io',
      'bcryptjs',
      'jsonwebtoken'
    ]
  },

  // Caching strategy
  caching: {
    // Static assets cache
    staticAssets: {
      maxAge: 31536000, // 1 year
      immutable: true
    },
    // API routes cache
    apiRoutes: {
      maxAge: 0, // No caching for API routes
      staleWhileRevalidate: false
    },
    // Page cache
    pages: {
      maxAge: 3600, // 1 hour
      staleWhileRevalidate: 86400 // 24 hours
    }
  },

  // Compression
  compression: {
    enabled: true,
    // Enable Brotli compression
    brotli: true,
    // Enable Gzip compression
    gzip: true
  },

  // Security headers
  security: {
    // Content Security Policy
    csp: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "wss:", "https:"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"]
    },
    // Other security headers
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    }
  },

  // Service Worker (for PWA capabilities)
  serviceWorker: {
    enabled: true,
    scope: '/',
    cacheName: 'marketing-tools-v1'
  },

  // Analytics and monitoring
  analytics: {
    // Enable Vercel Analytics
    vercel: true,
    // Enable Web Vitals tracking
    webVitals: true,
    // Custom analytics events
    customEvents: [
      'tool_usage',
      'page_view',
      'form_submission',
      'error_occurred'
    ]
  },

  // Error handling
  errorHandling: {
    // Global error boundary
    errorBoundary: true,
    // Error tracking
    errorTracking: true,
    // Custom error pages
    customErrorPages: true
  },

  // SEO optimization
  seo: {
    // Generate meta tags automatically
    autoMetaTags: true,
    // Generate structured data
    structuredData: true,
    // Optimize for Core Web Vitals
    coreWebVitals: true
  }
};

export default performanceConfig;