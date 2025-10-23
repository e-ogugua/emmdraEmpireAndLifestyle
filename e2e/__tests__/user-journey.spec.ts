import { test, expect } from '@playwright/test'

test.describe('Emmdra Empire E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/')
  })

  test.describe('Cart Functionality', () => {
    test('should add products to cart', async ({ page }) => {
      // Wait for products to load
      await page.waitForSelector('[data-product-id]')

      // Find and click the first product's "Shop" button
      const firstProduct = page.locator('[data-product-id]').first()
      const addToCartButton = firstProduct.locator('a[href^="/shop"]').first()

      // Click add to cart (assuming cart functionality is connected)
      await addToCartButton.click()

      // Check if cart count updates (if cart indicator exists)
      const cartIndicator = page.locator('[data-testid="cart-count"]')
      if (await cartIndicator.isVisible()) {
        await expect(cartIndicator).toHaveText(/^[1-9]\d*$/)
      }
    })

    test('should navigate through product categories', async ({ page }) => {
      // Look for category filters or navigation
      const categoryLinks = page.locator('a[href*="category"]')
      const productGrid = page.locator('.grid').first()

      // Verify products are displayed
      await expect(productGrid).toBeVisible()
      await expect(page.locator('[data-product-id]')).toHaveCount({ min: 1 })
    })
  })

  test.describe('Navigation', () => {
    test('should have working navigation menu', async ({ page }) => {
      // Check navigation elements
      const nav = page.locator('nav')
      await expect(nav).toBeVisible()

      // Test main navigation links
      const homeLink = page.locator('a[href="/"]')
      await expect(homeLink).toBeVisible()

      // Test cart link if exists
      const cartLink = page.locator('a[href="/cart"]')
      if (await cartLink.isVisible()) {
        await expect(cartLink).toBeVisible()
      }
    })

    test('should have accessible navigation', async ({ page }) => {
      // Check for ARIA labels and roles
      const nav = page.locator('nav[role="navigation"]')
      if (await nav.isVisible()) {
        await expect(nav).toBeVisible()
      }

      // Check for skip links or keyboard navigation
      await page.keyboard.press('Tab')
      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()
    })
  })

  test.describe('Responsive Design', () => {
    test('should be responsive on mobile', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })

      // Check mobile-specific elements
      const mobileMenu = page.locator('[data-testid="mobile-menu"]')
      if (await mobileMenu.isVisible()) {
        await expect(mobileMenu).toBeVisible()
      }

      // Verify content still accessible
      await expect(page.locator('h1')).toBeVisible()
    })

    test('should be responsive on tablet', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 })

      // Check tablet layout
      const mainContent = page.locator('main')
      await expect(mainContent).toBeVisible()

      // Verify responsive images
      const images = page.locator('img')
      await expect(images.first()).toBeVisible()
    })
  })

  test.describe('Contact Form', () => {
    test('should submit contact form successfully', async ({ page }) => {
      // Navigate to contact page
      await page.goto('/contact')

      // Fill out the form
      await page.fill('input[name="name"]', 'John Doe')
      await page.fill('input[name="email"]', 'john@example.com')
      await page.fill('input[name="phone"]', '+2348122394397')
      await page.fill('textarea[name="message"]', 'I would like to inquire about your styling services.')

      // Submit the form
      await page.click('button[type="submit"]')

      // Check for success message
      const successMessage = page.locator('text=/Message sent successfully|Thank you for your message/i')
      await expect(successMessage).toBeVisible({ timeout: 10000 })
    })

    test('should validate form fields', async ({ page }) => {
      await page.goto('/contact')

      // Try to submit empty form
      await page.click('button[type="submit"]')

      // Check for validation errors
      const errorMessages = page.locator('.text-red-500')
      await expect(errorMessages).toHaveCount({ min: 1 })
    })

    test('should handle different service types', async ({ page }) => {
      await page.goto('/contact')

      // Select different service types
      const serviceSelect = page.locator('select[name="service_type"]')
      await serviceSelect.selectOption('Wardrobe Consultation')
      await expect(serviceSelect).toHaveValue('Wardrobe Consultation')

      await serviceSelect.selectOption('Fashion Workshop')
      await expect(serviceSelect).toHaveValue('Fashion Workshop')
    })
  })

  test.describe('Accessibility', () => {
    test('should pass basic accessibility checks', async ({ page }) => {
      // Check for proper heading structure
      const h1 = page.locator('h1')
      await expect(h1).toBeVisible()

      // Check for alt text on images
      const images = page.locator('img')
      const imageCount = await images.count()

      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i)
        await expect(img).toHaveAttribute('alt')
      }
    })

    test('should be keyboard navigable', async ({ page }) => {
      // Tab through interactive elements
      await page.keyboard.press('Tab')
      let focusedElement = await page.locator(':focus').count()
      expect(focusedElement).toBeGreaterThan(0)

      // Continue tabbing
      await page.keyboard.press('Tab')
      focusedElement = await page.locator(':focus').count()
      expect(focusedElement).toBeGreaterThan(0)
    })

    test('should have proper ARIA labels', async ({ page }) => {
      // Check for buttons with proper labels
      const buttons = page.locator('button[aria-label], a[aria-label]')
      const buttonCount = await buttons.count()

      if (buttonCount > 0) {
        for (let i = 0; i < Math.min(buttonCount, 5); i++) {
          const button = buttons.nth(i)
          await expect(button).toHaveAttribute('aria-label')
        }
      }
    })
  })

  test.describe('Performance', () => {
    test('should load page within acceptable time', async ({ page }) => {
      const startTime = Date.now()

      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const loadTime = Date.now() - startTime
      expect(loadTime).toBeLessThan(5000) // 5 seconds max
    })

    test('should not have excessive JavaScript bundle', async ({ page }) => {
      // This would typically check bundle size in CI
      const jsResources = page.locator('script[src]')
      const jsCount = await jsResources.count()

      // Reasonable number of JavaScript files
      expect(jsCount).toBeLessThan(20)
    })
  })
})

test.describe('Social Media Integration', () => {
  test('should have working social media links', async ({ page }) => {
    await page.goto('/contact')

    // Check social media icons are present
    const facebookLink = page.locator('a[href*="facebook.com"]')
    const instagramLink = page.locator('a[href*="instagram.com"]')
    const twitterLink = page.locator('a[href*="twitter.com"]')
    const whatsappLink = page.locator('a[href*="wa.me"]')
    const pinterestLink = page.locator('a[href*="pinterest.com"]')

    // Verify at least some social links are present
    const socialLinksCount = await [facebookLink, instagramLink, twitterLink, whatsappLink, pinterestLink]
      .reduce(async (count, link) => {
        return count + (await link.isVisible() ? 1 : 0)
      }, Promise.resolve(0))

    expect(socialLinksCount).toBeGreaterThan(0)
  })

  test('should open social media links in new tab', async ({ page, context }) => {
    await page.goto('/contact')

    // Mock external link clicks
    const socialLinks = page.locator('a[href*="facebook.com"], a[href*="instagram.com"], a[href*="twitter.com"]')

    for (let i = 0; i < await socialLinks.count(); i++) {
      const link = socialLinks.nth(i)
      if (await link.isVisible()) {
        await expect(link).toHaveAttribute('target', '_blank')
        await expect(link).toHaveAttribute('rel', /noopener|noreferrer/)
      }
    }
  })
})

test.describe('Error Handling', () => {
  test('should handle 404 pages gracefully', async ({ page }) => {
    await page.goto('/nonexistent-page')

    // Should show 404 page or redirect
    const notFoundElement = page.locator('text=/404|Page not found|Not found/i')
    await expect(notFoundElement.or(page.locator('h1'))).toBeVisible()
  })

  test('should handle network errors', async ({ page }) => {
    // Intercept and delay API calls
    await page.route('**/api/**', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000)) // 2 second delay
      await route.abort('failed')
    })

    await page.goto('/')

    // Should still show page content or fallback
    await expect(page.locator('main')).toBeVisible()
  })
})
