import { test, expect } from '@playwright/test'

test('homepage loads with logo and latest article', async ({ page }) => {
  await page.goto('/')

  // Page title
  await expect(page).toHaveTitle(/台島新聞局/)

  // Header shows logo, Chinese name, and clock
  await expect(page.getByAltText('DOG\'S NEWS 台島新聞局').first()).toBeVisible()
  await expect(page.getByText('台島新聞局').first()).toBeVisible()
  // Clock renders with HH:MM:SS pattern (font-mono tabular-nums element)
  const clock = page.locator('span.font-mono')
  await expect(clock).toBeVisible()
  await expect(clock).toContainText(/\d{2}:\d{2}:\d{2}/)

  // Latest article card is rendered
  await expect(page.locator('article').first()).toBeVisible()

  // No stray 虛構新聞局 mentions in header/masthead
  const header = page.locator('header')
  await expect(header).not.toContainText('虛構新聞局')
})

test('article page renders markdown content with minute-level timestamp', async ({ page }) => {
  await page.goto('/')

  // Navigate via the wrapping anchor on the first news card
  const firstLink = page.locator('a[href^="/news/"]').first()
  const href = await firstLink.getAttribute('href')
  await page.goto(href!)

  // Verify we're on an article page
  await expect(page.url()).toContain('/news/')

  // Category badge is visible
  await expect(page.locator('.inline-block.bg-\\[\\#CC0000\\]').first()).toBeVisible()

  // Timestamp contains 年 月 日 format (date) and HH:MM (time)
  const timeEl = page.locator('time').first()
  await expect(timeEl).toBeVisible()
  const timeText = await timeEl.textContent()
  expect(timeText).toMatch(/\d{4}年\d{1,2}月\d{1,2}日/)
  expect(timeText).toMatch(/\d{2}:\d{2}/)

  // Back link returns to homepage
  await page.getByText('← 返回首頁').click()
  await expect(page).toHaveURL('/')
})

test('article page has Open Graph and Twitter Card meta tags', async ({ page }) => {
  await page.goto('/')
  const firstLink = page.locator('a[href^="/news/"]').first()
  const href = await firstLink.getAttribute('href')
  await page.goto(href!)

  const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content')
  const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content')
  const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content')
  const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content')

  expect(ogTitle).toBeTruthy()
  expect(ogDescription).toBeTruthy()
  expect(ogImage).toMatch(/\.(jpg|jpeg|png|webp)|logo_trans/)
  expect(twitterCard).toBe('summary_large_image')
})

test('footer shows single disclaimer and no extra virtual news mentions', async ({ page }) => {
  await page.goto('/')
  const footer = page.locator('footer')

  // Has copyright line
  await expect(footer).toContainText('台島新聞局')

  // Single disclaimer line
  const disclaimer = footer.getByText(/本站所有內容均為虛構/)
  await expect(disclaimer).toBeVisible()
  await expect(disclaimer).toHaveCount(1)
})
