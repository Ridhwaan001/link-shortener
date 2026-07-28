import { makeid } from "~~/server/utils/datahandler";

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

  const code = body.code as string;

  if (!code) {
    return createError({ status: 400, statusText: "Bad request" });
  }

  removeLink.run(code);

  let data = getAll.all();

  return data;
});
