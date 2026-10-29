import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = ["/", "/members/ana-silva", "/members/jordan-lee", "/members/nobody"];

// Automated WCAG 2.2 A/AA scan of every page at the narrowest supported width,
// with the OS set to light and to dark mode (the site is light-only, so both
// must still give the accessible light page). Catches contrast, labels, alt text, landmarks.
for (const colorScheme of ["light", "dark"] as const) {
  for (const path of pages) {
    test(`${path} has no axe violations (${colorScheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme });
      await page.setViewportSize({ width: 320, height: 800 });
      await page.goto(path);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }
}

test("no horizontal scrolling at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const path of pages) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, path).toBe(0);
  }
});
