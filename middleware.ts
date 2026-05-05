import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = { 
  // Protects everything except login, api, and static assets
  matcher: ["/((?!login|api|_next/static|_next/image|favicon.ico).*)"],
};