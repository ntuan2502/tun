import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { Paths } from "./paths";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: `[locale]${Paths.signin}`,
  },
});
