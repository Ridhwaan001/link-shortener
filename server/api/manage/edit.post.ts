export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, "token");
  if (!cookie) {
    return createError({ status: 403, statusText: "Forbidden" });
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

  const body = await readBody(event);

  const oldcode = body.old as string;
  const newcode = body.new as string;

  if (!oldcode || !newcode) {
    return createError({ status: 400, statusText: "Bad request" });
  }

  editLink.run(newcode, oldcode);

  let data = getAll.all();

  return data;
});
