import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = { 
  // 💡 Add "dist" to the exclusion list below
  matcher: [
    "/((?!api|login|dist|_next/static|_next/image|favicon.ico).*)",
  ] 
};