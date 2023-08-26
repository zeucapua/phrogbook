import { lucia } from "lucia";
import { astro } from "lucia/middleware";
import { twitch } from "@lucia-auth/oauth/providers";
import { prisma as prisma_adapter } from "@lucia-auth/adapter-prisma";
import { prisma_client } from "./prisma";

export const auth = lucia({
  env: import.meta.env.DEV ? "DEV" : "PROD",
  middleware: astro(),
  adapter: prisma_adapter(prisma_client),

  getUserAttributes: (data) => {
    return { 
      twitch_username: data.twitch_username
    }
  },
});

export const twitch_auth = twitch(auth, {
  clientId: import.meta.env.TWITCH_CLIENT_ID as string,
  clientSecret: import.meta.env.TWITCH_CLIENT_SECRET as string,
  redirectUri: import.meta.env.DEV ? "http://localhost:3000/login/twitch/callback" : "https://phrogbook.vercel.app/login/twitch/callback"
});

export type Auth = typeof auth;
