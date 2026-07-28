export default defineEventHandler(async (event) => {
  const env: any = process.env;
  try {
    const { code } = getQuery(event) as any;
    const discordCode = code;
    if (discordCode) {
      const response = (await $fetch(
        "https://discord.com/api/v10/oauth2/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: env.DISCORDCLIENTID,
            client_secret: env.DISCORDCLIENTSECRET,
            grant_type: "authorization_code",
            code: discordCode,
            redirect_uri: env.DISCORDCALLBACK,
          }),
        },
      )) as any;
      if (response) {
        setCookie(event, "token", response.access_token, {
          path: "/",
          maxAge: 86400 * 6,
        });
        // let cookie = getCookie(event, "redirect");
        // if (cookie) {
        //   deleteCookie(event, "redirect");
        //   return sendRedirect(event, cookie);
        // } else {
        //   return sendRedirect(event, "/");
        // }

        return sendRedirect(event, "/admin");
      } else {
        return createError({
          statusCode: 500,
          statusMessage: "Something went wrong",
          message: "We couldn't fetch data from Discord",
          stack: "",
        });
      }
    } else {
      return createError({
        statusCode: 400,
        statusMessage: "Something went wrong",
        message: "Bad request",
        stack: "",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
