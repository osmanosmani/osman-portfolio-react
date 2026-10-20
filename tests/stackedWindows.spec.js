import { test, expect } from '@playwright/test'

const previews = [
  { title: 'NordicWebHub', slug: 'nordicwebhub', image: 'nordicwebhub-customer-dashboard.webp' },
  { title: 'CineScope', slug: 'cinescope', image: 'cinescope-homepage.webp' },
  { title: 'Nacka Byggpartner', slug: 'nacka-byggpartner', image: 'nacka-byggpartner-homepage-top.webp' },
]

test.beforeEach(async ({ page }) => {
  // These interaction tests never send email, even if the form is submitted accidentally.
  await page.route('https://api.web3forms.com/**', (route) => route.abort())
})

async function expectSelected(page, project, language = 'en') {
  const tab = page.getByRole('tab', { name: project.title, exact: true })
  const panel = page.getByRole('tabpanel')
  await expect(tab).toHaveAttribute('aria-selected', 'true')
  await expect(page.locator('.dc-window-tabs [aria-selected="true"]')).toHaveCount(1)
  await expect(panel).toHaveCount(1)
  await expect(panel).toHaveAttribute('aria-labelledby', await tab.getAttribute('id'))
  await expect(panel.locator('img')).toHaveAttribute('src', new RegExp(project.image.replaceAll('.', '\\.')))
  const caseStudy = page.locator('.dc-preview-links').getByRole('link').first()
  await expect(caseStudy).toContainText(project.title)
  await expect(caseStudy).toHaveAttribute('href', `${language === 'sv' ? '/sv' : ''}/projects/${project.slug}`)
}

async function expectExposedHeaders(page) {
  await page.locator('.dc-window-stack').scrollIntoViewIfNeeded()
  await expect.poll(() => page.locator('.dc-window-tabs [role="tab"]').evaluateAll((tabs) => tabs.every((tab) => {
    const bounds = tab.getBoundingClientRect()
    const hit = document.elementFromPoint(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2)
    return bounds.width > 0 && bounds.height >= 40 && (hit === tab || tab.contains(hit))
  }))).toBe(true)
}

async function expectFrontWindowGeometry(page) {
  await expect.poll(() => page.locator('.dc-window-stack').evaluate((stack) => {
    const tabs = [...stack.querySelectorAll('[role="tab"]')]
    const active = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true').getBoundingClientRect()
    const inactive = tabs.filter((tab) => tab.getAttribute('aria-selected') !== 'true').map((tab) => tab.getBoundingClientRect())
    const panel = stack.querySelector('[role="tabpanel"]').getBoundingClientRect()
    return inactive.every((bounds) => bounds.bottom <= active.top + 1 && bounds.width < active.width && bounds.x > active.x)
      && Math.abs(active.x - panel.x) <= 2
      && Math.abs(active.width - panel.width) <= 2
      && Math.abs(active.bottom - panel.top) <= 2
  })).toBe(true)
}

for (const width of [320, 390, 1280]) {
  test(`stacked project titles stay exposed and bring the correct window forward at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    await expect(page.locator('.dc-window-tabs')).toHaveAttribute('aria-orientation', 'vertical')
    await expect(page.getByRole('tab')).toHaveCount(3)
    for (const project of previews) {
      await expectExposedHeaders(page)
      await page.getByRole('tab', { name: project.title, exact: true }).click()
      await expectSelected(page, project)
      await expectFrontWindowGeometry(page)
      await expectExposedHeaders(page)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    }
  })
}

test('selected project remains in front when switching between English and Swedish', async ({ page }) => {
  await page.goto('/')
  const project = previews[2]
  await page.getByRole('tab', { name: project.title, exact: true }).click()
  await page.locator('.dc-header').getByRole('button', { name: 'Svenska', exact: true }).click()
  await expect(page).toHaveURL(/\/sv\/$/)
  await expectSelected(page, project, 'sv')
  await expectFrontWindowGeometry(page)
  await page.locator('.dc-header').getByRole('button', { name: 'English', exact: true }).click()
  await expectSelected(page, project)
})

test('window titles support vertical arrows, wraparound, Home and End', async ({ page }) => {
  await page.goto('/')
  const tabs = page.getByRole('tab')
  await tabs.first().focus()
  const sequence = [
    ['ArrowUp', 2],
    ['ArrowDown', 0],
    ['ArrowDown', 1],
    ['End', 2],
    ['Home', 0],
    ['ArrowRight', 1],
    ['ArrowLeft', 0],
  ]
  for (const [key, selected] of sequence) {
    await page.keyboard.press(key)
    await expect(tabs.nth(selected)).toBeFocused()
    await expectSelected(page, previews[selected])
    await expect(tabs.nth(selected)).toHaveAttribute('tabindex', '0')
    for (let index = 0; index < previews.length; index += 1) {
      if (index !== selected) await expect(tabs.nth(index)).toHaveAttribute('tabindex', '-1')
    }
  }
})

test('full screenshot opens the selected window and Escape restores opener focus', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('tab', { name: 'Nacka Byggpartner', exact: true }).click()
  const opener = page.getByRole('button', { name: /^View full screenshot\s*:\s*Nacka Byggpartner$/ })
  await opener.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('heading')).toContainText('Nacka Byggpartner')
  await expect(dialog.locator('img')).toHaveAttribute('src', /nacka-byggpartner-homepage-full\.webp/)
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(opener).toBeFocused()
  await expectSelected(page, previews[2])
})

test('reduced motion switches windows without transition or entrance animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.getByRole('tab', { name: 'CineScope', exact: true }).click()
  await expectSelected(page, previews[1])
  await expectFrontWindowGeometry(page)
  expect(await page.locator('.dc-enter').first().evaluate((element) => getComputedStyle(element).animationName)).toBe('none')
  const transitionsDisabled = await page.locator('.dc-window-stack').evaluate((stack) => {
    const durationInSeconds = (value) => value.trim().endsWith('ms') ? parseFloat(value) / 1000 : parseFloat(value)
    return [stack, ...stack.querySelectorAll('*')].every((element) => getComputedStyle(element).transitionDuration
      .split(',').every((value) => durationInSeconds(value) <= 0.001))
  })
  expect(transitionsDisabled).toBe(true)
})

test('thumbnail selectors and window titles stay synchronized on mobile and desktop', async ({ page }) => {
  for (const width of [320, 1280]) {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('/')
    const chooser = page.getByRole('group', { name: 'Choose a project', exact: true })
    const buttons = chooser.getByRole('button')
    await expect(buttons).toHaveCount(3)
    for (const [index, project] of previews.entries()) {
      const button = chooser.getByRole('button', { name: project.title, exact: true })
      if (width > 860) await expect(button.locator('img')).toBeVisible()
      else await expect(button.locator('img')).toBeHidden()
      await expect(button.locator('.dc-tab-number')).toHaveText(`0${index + 1}`)
      await button.click()
      await expectSelected(page, project)
      await expect(button).toHaveAttribute('aria-pressed', 'true')
      await expect(button).toHaveAttribute('aria-controls', 'project-preview-panel')
      await expect(chooser.locator('[aria-pressed="true"]')).toHaveCount(1)
      await expectFrontWindowGeometry(page)
      const nextProject = previews[(index + 1) % previews.length]
      await page.getByRole('tab', { name: nextProject.title, exact: true }).click()
      await expectSelected(page, nextProject)
      await expect(chooser.getByRole('button', { name: nextProject.title, exact: true })).toHaveAttribute('aria-pressed', 'true')
      await expect(button).toHaveAttribute('aria-pressed', 'false')
    }
    expect(await chooser.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true)
    for (const button of await buttons.all()) {
      expect(await button.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
})

test('thumbnail keyboard activation keeps focus in the lower row and selection survives Swedish', async ({ page }) => {
  await page.goto('/')
  const buttons = page.getByRole('group', { name: 'Choose a project', exact: true }).getByRole('button')
  await buttons.first().focus()
  await page.keyboard.press('Tab')
  await expect(buttons.nth(1)).toBeFocused()
  await page.keyboard.press('Enter')
  await expectSelected(page, previews[1])
  await page.keyboard.press('Tab')
  await expect(buttons.nth(2)).toBeFocused()
  await page.keyboard.press('Space')
  await expectSelected(page, previews[2])
  for (const [key, selected] of [['ArrowRight', 0], ['End', 2], ['Home', 0], ['ArrowLeft', 2]]) {
    await page.keyboard.press(key)
    await expect(buttons.nth(selected)).toBeFocused()
    await expect(buttons.nth(selected)).toHaveAttribute('aria-pressed', 'true')
    await expectSelected(page, previews[selected])
  }
  await page.locator('.dc-header').getByRole('button', { name: 'Svenska', exact: true }).click()
  const swedishChooser = page.getByRole('group', { name: 'Välj projekt', exact: true })
  await expectSelected(page, previews[2], 'sv')
  await expect(swedishChooser.getByRole('button', { name: 'Nacka Byggpartner', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await swedishChooser.getByRole('button', { name: 'CineScope', exact: true }).click()
  await expectSelected(page, previews[1], 'sv')
})
