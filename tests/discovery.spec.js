import { test, expect } from '@playwright/test'

const marketingHeading = 'Digital Marketing & SEO Case Studies'
const cases = ['kosovo-police', 'berisha-group', 'chillouthouse']
const languages = [
  { code: 'en', home: '/', prefix: '', heading: marketingHeading, explore: 'Explore case studies' },
  { code: 'sv', home: '/sv/', prefix: '/sv', heading: 'Fallstudier inom digital marknadsföring & SEO', explore: 'Utforska fallstudier' },
]

test.beforeEach(async ({ page }) => {
  // Discovery checks must never send a contact email.
  await page.route('https://api.web3forms.com/**', (route) => route.abort())
})

for (const language of languages) {
  const marketingPath = `${language.prefix}/case-studies/digital-marketing`

  test(`Home ${language.code} makes marketing case studies reachable, including direct case links`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(language.home)
    const section = page.locator('#marketing')
    await expect(section.getByRole('heading', { level: 2, name: language.heading, exact: true })).toBeVisible()
    await section.getByRole('link', { name: language.explore, exact: true }).click()
    await expect(page).toHaveURL(marketingPath)
    await expect(page.getByRole('heading', { level: 1, name: marketingHeading, exact: true })).toBeVisible()
    await expect(page).toHaveTitle(`${marketingHeading} | Osman Osmani`)
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('lang', language.code)
    await expect(page.getByRole('heading', { level: 1, name: marketingHeading, exact: true })).toBeVisible()

    for (const caseId of cases) {
      await page.goto(language.home)
      await page.locator('#marketing').locator(`a[href="${marketingPath}#${caseId}"]`).click()
      await expect(page).toHaveURL(`${marketingPath}#${caseId}`)
      await page.reload()
      await expect(page.locator('html')).toHaveAttribute('lang', language.code)
      await expect(page.locator(`#${caseId}`)).toBeInViewport()
    }
  })

  test(`Home ${language.code} retains marketing, phone and certification entry points`, async ({ page }) => {
    await page.goto(language.home)
    const footerLink = page.getByRole('contentinfo').getByRole('link', { name: language.heading, exact: true })
    await footerLink.click()
    await expect(page).toHaveURL(marketingPath)
    await expect(page.getByRole('heading', { level: 1, name: marketingHeading, exact: true })).toBeVisible()

    await page.goto(`${language.prefix}/projects`)
    await page.locator('#portfolio').getByRole('link', { name: language.heading, exact: true }).click()
    await expect(page).toHaveURL(marketingPath)
    await expect(page.locator('html')).toHaveAttribute('lang', language.code)

    await page.goto(language.home)
    await expect(page.locator('#contact a[href="tel:+46707949608"]')).toBeVisible()
    await page.locator('.dc-byline').getByRole('link', { name: /Azure/ }).click()
    await expect(page).toHaveURL(`${language.prefix}/credentials#azure-certification`)
    await expect(page.locator('html')).toHaveAttribute('lang', language.code)
    await expect(page.locator('#azure-certification')).toBeInViewport()
  })

  for (const width of [320, 1280]) {
    test(`Marketing discovery and footer ${language.code} fit ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(language.home)
      await page.evaluate(() => document.fonts.ready)

      for (const section of [page.locator('#marketing'), page.getByRole('contentinfo')]) {
        await section.scrollIntoViewIfNeeded()
        const overflowing = await section.evaluate((element) =>
          [element, ...element.querySelectorAll('a, h2')].some((item) => {
            const rect = item.getBoundingClientRect()
            return rect.left < -1 || rect.right > window.innerWidth + 1
          }),
        )
        expect(overflowing).toBe(false)
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    })
  }
}

for (const language of languages) {
  test('Marketing detail ' + language.code + ' keeps images within their columns', async ({ page }) => {
    for (const width of [320, 390, 1280]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(language.prefix + '/case-studies/digital-marketing')
      await page.evaluate(() => document.fonts.ready)
      const imagesFit = await page.locator('.marketing-figure .portfolio-image-wrap').evaluateAll((wrappers) =>
        wrappers.length === 3 && wrappers.every((wrapper) => {
          const image = wrapper.getBoundingClientRect()
          const figure = wrapper.parentElement.getBoundingClientRect()
          return image.left >= figure.left - 1 && image.right <= figure.right + 1
        }),
      )
      expect(imagesFit).toBe(true)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    }
  })
}
