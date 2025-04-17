import {
  loginSchema,
  type Credentials as CredentialsType,
} from "@/lib/schema/authentication";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const getUserByCredentials = async (credentials: CredentialsType) => {
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, credentials.username));

  if (!users.length) {
    return null;
  }
  const [user] = users;

  const isValid = await bcrypt.compare(credentials.password, user.password);

  return isValid ? { id: `${user.id}`, username: user.username } : null;
};

const intlMiddleware = createIntlMiddleware(routing);

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }

      if (token.username) {
        session.user.username = token.username;
      }

      return session;
    },
    authorized({ auth, request }) {
      const { nextUrl } = request;
      const isLoggedIn = !!auth?.user;
      const isPageProtected = nextUrl.pathname.startsWith("/admin");

      if (isPageProtected) {
        return isLoggedIn;
      }

      if (!nextUrl.pathname.startsWith("/admin")) {
        return intlMiddleware(request); // <- handles redirect if not authenticated
      }

      return true;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      credentials: {
        username: {
          label: "Username",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        try {
          const { username, password } =
            await loginSchema.parseAsync(credentials);

          const user = await getUserByCredentials({ username, password });

          if (!user) {
            return null;
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
