import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = { 
  // We explicitly exclude the login page and all internal Next.js/API calls
  matcher: [
    "/((?!api|login|_next/static|_next/image|favicon.ico).*)",
  ] 
};