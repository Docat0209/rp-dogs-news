import { test, expect } from '@playwright/test'

test('homepage loads with masthead and shows articles or empty state', async ({ page }) => {
  await page.goto('/')

  // Page title
  await expect(page).toHaveTitle(/海狗新聞局/)

  // Header shows logo, Chinese name, and clock
  await expect(page.getByAltText('DOG\'S NEWS 海狗新聞局').first()).toBeVisible()
  await expect(page.getByText('海狗新聞局').first()).toBeVisible()
  // Clock renders with HH:MM:SS pattern (font-mono tabular-nums element)
  const clock = page.locator('span.font-mono')
  await expect(clock).toBeVisible()
  await expect(clock).toContainText(/\d{2}:\d{2}:\d{2}/)

  // Either at least one article card renders, or the empty state is shown
  const articleCount = await page.locator('article').count()
  if (articleCount > 0) {
    await expect(page.locator('article').first()).toBeVisible()
  } else {
    await expect(page.getByText('尚無新聞')).toBeVisible()
  }

  // No stray 虛構新聞局 mentions in header/masthead
  const header = page.locator('header')
  await expect(header).not.toContainText('虛構新聞局')
})

test('article page renders markdown content with minute-level timestamp', async ({ page }) => {
  await page.goto('/')

  // Skip when the site has no articles yet
  const firstLink = page.locator('a[href^="/news/"]').first()
  test.skip((await page.locator('a[href^="/news/"]').count()) === 0, 'no articles published')

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
  test.skip((await page.locator('a[href^="/news/"]').count()) === 0, 'no articles published')

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

test('page 2 shows at most 9 articles, or 404s when there is no second page', async ({ page }) => {
  const response = await page.goto('/page/2')

  // With few or no articles there is no second page — a 404 is the correct outcome
  if (response && response.status() === 404) {
    return
  }

  await expect(page).toHaveTitle(/第 2 頁/)

  // Article grid renders with at most 9 cards
  const articles = page.locator('article')
  const count = await articles.count()
  expect(count).toBeGreaterThan(0)
  expect(count).toBeLessThanOrEqual(9)

  // Pagination controls are visible
  await expect(page.locator('nav[aria-label="pagination"]')).toBeVisible()
})

test('footer shows single disclaimer and no extra virtual news mentions', async ({ page }) => {
  await page.goto('/')
  const footer = page.locator('footer')

  // Has copyright line
  await expect(footer).toContainText('海狗新聞局')

  // Single disclaimer line
  const disclaimer = footer.getByText(/本站所有內容均為虛構/)
  await expect(disclaimer).toBeVisible()
  await expect(disclaimer).toHaveCount(1)
})
