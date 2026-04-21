export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/goals",
    "/roadmap",
    "/learning",
    "/upskill",
    "/calendar",
    "/credentials",
    "/about"
  ],
};