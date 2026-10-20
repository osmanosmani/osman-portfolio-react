import { test, expect } from '@playwright/test'

test('project dialog keeps keyboard focus inside and Escape returns to its opener', async ({ page }) => {
  await page.goto('/projects')
  const opener = page.getByRole('button', { name: /Open project details for CineScope/ })
  await opener.focus()
  await opener.press('Enter')

  const dialog = page.getByRole('dialog')
  const close = dialog.getByRole('button', { name: 'Close project details', exact: true })
  const caseStudy = dialog.getByRole('link', { name: /Open case study page/ })
  const lastLink = dialog.getByRole('link').last()
  await expect(close).toBeFocused()

  await page.keyboard.press('Tab')
  await expect(caseStudy).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(close).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(lastLink).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(close).toBeFocused()

  // Focus moved by another UI/script must not expose the background of a modal.
  await page.locator('.dc-brand').focus()
  await expect(close).toBeFocused()

  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(opener).toBeFocused()
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
})

test('project dialog retains its close button and backdrop dismissal on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/projects')
  const opener = page.getByRole('button', { name: /Open project details for CineScope/ })
  await opener.focus()
  await opener.press('Enter')
  await page.getByRole('button', { name: 'Close project details', exact: true }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(opener).toBeFocused()

  await opener.press('Enter')
  await page.locator('.project-modal-backdrop').click({ position: { x: 2, y: 2 } })
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(opener).toBeFocused()
})
