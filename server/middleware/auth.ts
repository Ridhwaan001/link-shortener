export default defineEventHandler(async (event) => {
  if (
    !event.path.toLowerCase().includes("admin") ||
    event.path.startsWith("/__nuxt_error")
  ) {
    return;
  }

  const cookie = await getCookie(event, "token");
  if (!cookie) {
    await sendRedirect(event, process.env.DISCORDAUTHLINK as string);
  }

  const userinfo = (await $fetch("https://discord.com/api/v10/users/@me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  })) as any;

  const userid = userinfo.id as string;

  if (userid !== "657925022223958016") {
    return createError({ status: 403, statusText: "Forbidden" });
  }

  return;
});
