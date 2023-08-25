import { auth, twitch_auth } from "../../../lib/lucia";
import { OAuthRequestError } from "@lucia-auth/oauth";
import type { APIRoute } from "astro";

export const get : APIRoute = async (context) => {
  const stored_state = context.cookies.get("twitch_oauth_state").value;
  const state = context.url.searchParams.get("state");
  const code = context.url.searchParams.get("code");

  if (!stored_state || !state || stored_state !== state || !code) {
    return new Response(null, { status: 400 });
  }

  try {
    const { existingUser, twitchUser, createUser } = await twitch_auth.validateCallback(code);
    const getUser = async () => {
      if (existingUser) return existingUser;

      console.log({ twitchUser });

      const user = await createUser({
        attributes: {
          twitch_username: twitchUser.login
        }
      });

      return user;
    };

    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {}
    });

    context.locals.auth.setSession(session);
    return context.redirect("/login", 302);
  }
  catch (e) {
    if (e instanceof OAuthRequestError) {
      return new Response(null, { status: 400 });
    }
    
    return new Response(null, { status: 500 });
  }
}
