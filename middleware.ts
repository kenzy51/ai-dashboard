import { withAuth } from "next-auth/middleware";

// Explicitly export the function as default
export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = { 
  matcher: [
    "/chats/:path*", 
    "/dashboard/:path*", 
    "/config/:path*",
    "/" 
  ] 
};