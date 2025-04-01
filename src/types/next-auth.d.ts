import "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
  }

  interface Session {
    user: User;
  }
}

import "next-auth/jwt";
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id?: string;
    username: string;
  }
}
