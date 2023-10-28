export default async function () {
  if (global.browser) {
    await global.browser.close();
  }
}
