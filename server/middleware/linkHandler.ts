export default defineEventHandler(async (event) => {
  if (
    event.path.includes("admin") ||
    event.path.includes("api") ||
    event.path.startsWith("/__nuxt_error")
  ) {
    return;
  }

  const path = event.path.replaceAll("/", "");

  const code = path;

  const fetch = getLink.get(code);

  if (!fetch) {
    await sendRedirect(event, "https://google.com");
  }

  await sendRedirect(event, (fetch as any).link as string);
});
