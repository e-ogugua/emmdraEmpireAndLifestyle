module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      startServerCommand: 'npm run dev',
      startServerReadyPattern: 'Ready',
      startServerReadyTimeout: 30000,
    },
    assert: {
      assertions: {
        // Performance
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.85 }],
        'categories:seo': ['error', { minScore: 0.9 }],

        // Specific audits
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],

        // Accessibility
        'color-contrast': ['error', { minScore: 0.9 }],
        'image-alt': ['error', { minScore: 1.0 }],
        'heading-order': ['error', { minScore: 1.0 }],
        'focusable-controls': ['error', { minScore: 1.0 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
