import { test, expect } from '@playwright/test'

for (const language of ['en', 'sv']) {
  for (const width of [320, 390, 900, 1024, 1280]) {
    test(`Home ${language} fits ${width}px with working project tabs`, async ({ page }) => {
      const errors = []
      page.on('pageerror', (error) => errors.push(error.message))
      await page.setViewportSize({ width, height: 900 })
      await page.goto(language === 'en' ? '/' : '/sv/')
      await page.evaluate(() => document.fonts.ready)
      await expect(page.locator('html')).toHaveAttribute('lang', language)
      await expect(page.locator('h1')).toHaveCount(1)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      if (width < 861) await expect(page.locator('.dc-desktop-nav')).toBeHidden()
      else await expect(page.locator('.dc-desktop-nav')).toBeVisible()
      const tabs = page.getByRole('tab')
      await expect(tabs).toHaveCount(3)
      for (let index = 0; index < 3; index++) {
        const tab = tabs.nth(index)
        await tab.click()
        await expect(tab).toHaveAttribute('aria-selected', 'true')
        await expect(page.getByRole('tabpanel').locator('img')).toBeVisible()
        expect(await tab.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true)
      }
      await tabs.last().press('Home')
      await expect(tabs.first()).toBeFocused()
      await tabs.first().press('ArrowRight')
      await expect(tabs.nth(1)).toBeFocused()
      await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true')
      expect(errors).toEqual([])
    })
  }
}

test('contact draft survives language, preview, menu and viewer interactions', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const draft = { name: 'Åsa Öberg', email: 'test@example.test', subject: 'Förfrågan', message: 'Hej Osman!\nEn andra rad.' }
  for (const [field, value] of Object.entries(draft)) await page.locator(`#contact-${field}`).fill(value)
  await page.locator('.dc-header').getByRole('button', { name: 'Svenska' }).click()
  await expect(page).toHaveURL(/\/sv\/$/)
  await page.getByRole('tab', { name: 'CineScope', exact: true }).click()
  await page.getByRole('button', { name: 'Meny', exact: true }).click()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Meny', exact: true })).toBeFocused()
  const opener = page.getByRole('button', { name: /Visa hela skärmbilden/ })
  await opener.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('button', { name: 'Verklig storlek' }).click()
  await expect(page.getByRole('button', { name: 'Anpassa till bredd' })).toHaveAttribute('aria-pressed', 'true')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(opener).toBeFocused()
  for (const [field, value] of Object.entries(draft)) await expect(page.locator(`#contact-${field}`)).toHaveValue(value)
  await page.getByRole('button', { name: 'Meny', exact: true }).click()
  await page.locator('#site-mobile-menu').getByRole('link', { name: 'Kontakt', exact: true }).click()
  await expect(page.locator('#site-mobile-menu')).toBeHidden()
  await expect(page.locator('#contact-heading')).toBeFocused()
  await page.goBack()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  for (const [field, value] of Object.entries(draft)) await expect(page.locator(`#contact-${field}`)).toHaveValue(value)
})

test('desktop contact navigation and skip link move keyboard focus', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.locator('.dc-skip')).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
  await page.locator('.dc-desktop-nav').getByRole('link', { name: 'Contact', exact: true }).click()
  await expect(page.locator('#contact-heading')).toBeFocused()
})

test('full Nacka screenshot is deferred until the viewer opens', async ({ page }) => {
  const fullImageRequests = []
  page.on('request', (request) => { if (request.resourceType() === 'image' && request.url().includes('nacka-byggpartner-homepage-full.webp')) fullImageRequests.push(request.url()) })
  await page.goto('/')
  await page.getByRole('tab', { name: 'Nacka Byggpartner', exact: true }).click()
  expect(fullImageRequests).toHaveLength(0)
  await page.getByRole('button', { name: /View full screenshot/ }).click()
  const image = page.getByRole('dialog').locator('img')
  await expect(image).toBeVisible()
  await expect.poll(() => image.evaluate((element) => element.naturalHeight)).toBe(8023)
  expect(fullImageRequests.length).toBeGreaterThan(0)
})

test('contact validates Subject, keeps failed drafts and clears successful submissions', async ({ page }) => {
  const requests = []
  let success = false
  await page.route('**/api/contact.php', async (route) => {
    if (route.request().method() === 'OPTIONS') {
      await route.fulfill({ status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'Content-Type' } })
      return
    }
    requests.push(route.request().postDataJSON())
    await route.fulfill({ status: success ? 200 : 500, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ success }) })
  })
  await page.goto('/sv/')
  await page.locator('#contact-name').fill('Åsa')
  await page.locator('#contact-email').fill('test@example.test')
  await page.locator('#contact-message').fill('Hej')
  await page.getByRole('button', { name: 'Skicka meddelande' }).click()
  await expect(page.locator('#contact-subject')).toBeFocused()
  expect(requests).toHaveLength(0)
  await page.locator('#contact-subject').fill('Projekt')
  await page.getByRole('button', { name: 'Skicka meddelande' }).click()
  await expect(page.getByRole('alert')).toBeVisible()
  await expect(page.locator('#contact-message')).toHaveValue('Hej')
  expect(requests[0]).toEqual({ name: 'Åsa', email: 'test@example.test', subject: 'Projekt', message: 'Hej' })
  success = true
  await page.getByRole('button', { name: 'Skicka meddelande' }).click()
  await expect(page.getByRole('status')).toContainText('Tack')
  await expect(page.locator('#contact-message')).toHaveValue('')
})

test('reduced motion disables Home entrance animations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  expect(await page.locator('.dc-enter').first().evaluate((element) => getComputedStyle(element).animationName)).toBe('none')
})
