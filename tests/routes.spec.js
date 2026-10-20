import { test, expect } from '@playwright/test'

test('existing case studies and dedicated pages remain reachable after refresh', async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  // Import project data through Vite so its bundled image imports resolve normally.
  await page.goto('/projects')
  const paths = await page.evaluate(async () => {
    const { projects } = await import('/src/data/projects.js')
    return projects.map((project) => project.caseStudyUrl)
  })
  expect(paths).toHaveLength(8)
  for (const path of [...paths, '/experience', '/credentials', '/case-studies/digital-marketing']) {
    await page.goto(path)
    await page.reload()
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).not.toHaveText('Page not found')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  expect(errors).toEqual([])
})

test('mobile content pages keep all existing professional content visible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/experience')
  await expect(page.getByRole('heading', { name: 'Work Experience', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Additional Professional Background' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Additional Professional Development' })).toBeVisible()
  await expect(page.getByText(/Olof Palme International Center/)).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.goto('/credentials')
  await expect(page.getByRole('heading', { name: 'Microsoft Certified: Azure Fundamentals', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Selected Training & Certifications', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Work Experience', exact: true })).toHaveCount(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('project modal remains available and Escape restores focus', async ({ page }) => {
  await page.goto('/projects')
  await expect(page.getByRole('heading', { name: 'Featured Projects', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Selected Professional Work', exact: true })).toBeVisible()
  const card = page.getByRole('button', { name: /Open project details for CineScope/ })
  await card.focus()
  await card.press('Enter')
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close project details', exact: true })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(card).toBeFocused()
})

test('old anchor links still land at the intended content', async ({ page }) => {
  for (const [hash, path, id] of [['portfolio', '/projects', 'portfolio'], ['about', '/experience', 'about'], ['skills', '/experience', 'skills'], ['resume', '/experience', 'resume'], ['azure-certification', '/credentials', 'azure-certification']]) {
    await page.goto(`/#${hash}`)
    await expect(page).toHaveURL(new RegExp(path))
    await expect(page.locator(`#${id}`)).toBeVisible()
  }
})

test('language switching keeps the current case-study route', async ({ page }) => {
  await page.goto('/projects/cinescope')
  await page.locator('.dc-header').getByRole('button', { name: 'Svenska' }).click()
  await expect(page).toHaveURL(/\/sv\/projects\/cinescope$/)
  await expect(page.locator('h1')).toContainText('CineScope')
  await expect(page.locator('.dc-language-note')).toContainText('engelska')
  await page.reload()
  await expect(page.locator('h1')).toContainText('CineScope')
  await page.getByRole('link', { name: 'Back to Portfolio', exact: true }).click()
  await expect(page).toHaveURL(/\/sv\/projects$/)
  await page.getByRole('button', { name: /Open project details for CineScope/ }).click()
  await page.getByRole('dialog').getByRole('link', { name: /Open case study page/ }).click()
  await expect(page).toHaveURL(/\/sv\/projects\/cinescope$/)
})

test('new display typography and legacy CTA contrast remain isolated', async ({ page }) => {
  await page.goto('/')
  expect(await page.locator('h1').evaluate((element) => getComputedStyle(element).fontFamily)).toContain('Fraunces')
  await page.goto('/projects')
  expect(await page.locator('.project-open-btn').first().evaluate((element) => getComputedStyle(element).color)).toBe('rgb(31, 41, 55)')
})

test('unknown paths show an explicit not-found page', async ({ page }) => {
  await page.goto('/not-a-portfolio-page')
  await expect(page.getByRole('heading', { name: 'Page not found', exact: true })).toBeVisible()
  await page.getByRole('link', { name: 'Back to Home', exact: true }).click()
  await expect(page.locator('h1')).toHaveText('Osman Osmani')
})
