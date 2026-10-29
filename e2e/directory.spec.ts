import { expect, test } from "@playwright/test";

test("search filters by name or role and updates the live result count", async ({ page }) => {
  await page.goto("/");
  const status = page.getByRole("status");
  const search = page.getByRole("searchbox", { name: "Search by name or role" });

  await expect(status).toHaveText("Showing all 7 people");
  await expect(page.getByRole("listitem")).toHaveCount(7);

  await search.fill("lea");
  await expect(status).toHaveText("Showing 1 of 7 people");
  await expect(page.getByRole("link", { name: "Léa Martin" })).toBeVisible();

  await search.fill("engineer");
  await expect(status).toHaveText("Showing 2 of 7 people");
});

test("empty state can be cleared with the keyboard, returning focus to the search", async ({ page }) => {
  await page.goto("/");
  const search = page.getByRole("searchbox", { name: "Search by name or role" });

  await search.fill("zzz");
  await expect(page.getByText("No one matches “zzz”.")).toBeVisible();

  // Tab order: search field → department filter → "Clear filters".
  await page.keyboard.press("Tab");
  await expect(page.getByLabel("Department")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Clear filters" })).toBeFocused();
  await page.keyboard.press("Enter");

  await expect(search).toBeFocused();
  await expect(search).toHaveValue("");
  await expect(page.getByRole("status")).toHaveText("Showing all 7 people");
  await expect(page).toHaveURL("/");
});

test("department filter combines with the search and is kept in the URL", async ({ page }) => {
  await page.goto("/");
  const status = page.getByRole("status");

  await page.getByLabel("Department").selectOption("Design");
  await expect(status).toHaveText("Showing 2 of 7 people");
  await expect(page).toHaveURL("/?department=Design");

  await page.getByRole("searchbox", { name: "Search by name or role" }).fill("sam");
  await expect(status).toHaveText("Showing 1 of 7 people");
  await expect(page).toHaveURL("/?q=sam&department=Design");
});

test("a shared link opens with the search and filter already applied", async ({ page }) => {
  await page.goto("/?q=engineer&department=Engineering");

  await expect(page.getByRole("searchbox", { name: "Search by name or role" })).toHaveValue("engineer");
  await expect(page.getByLabel("Department")).toHaveValue("Engineering");
  await expect(page.getByRole("status")).toHaveText("Showing 2 of 7 people");
});

test("an unknown department in the URL falls back to all departments", async ({ page }) => {
  await page.goto("/?department=Nope");
  await expect(page.getByLabel("Department")).toHaveValue("");
  await expect(page.getByRole("status")).toHaveText("Showing all 7 people");
});

test("going back from a profile keeps the filters", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Department").selectOption("Sales");
  await page.getByRole("link", { name: "Léa Martin" }).click();
  await expect(page).toHaveURL("/members/lea-martin");

  await page.goBack();
  await expect(page).toHaveURL("/?department=Sales");
  await expect(page.getByLabel("Department")).toHaveValue("Sales");
  await expect(page.getByRole("status")).toHaveText("Showing 1 of 7 people");
});

test("skip link is the first tab stop and moves focus to main", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();

  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("a card links to the profile, which links back", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Priya Nair" }).click();

  await expect(page).toHaveURL("/members/priya-nair");
  await expect(page).toHaveTitle("Priya Nair | Team Directory");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Priya Nair");

  await page.getByRole("link", { name: "Back to directory" }).click();
  await expect(page).toHaveURL("/");
});

test("unknown member ids return a real 404 page", async ({ page }) => {
  const response = await page.goto("/members/nobody");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
});
