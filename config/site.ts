export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Mit főzzek?",
  description: "Alkoss listát az otthoni összetevőidből, és keress recepteket ezek alapján!",
  navItems: [
    {
      label: "Főoldal",
      href: "/",
    },
    {
      label: "Keresés",
      href: "/search",
    },
    {
      label: "Rólunk",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Főoldal",
      href: "/",
    },
    {
      label: "Profil",
      href: "/profile",
    },
    {
      label: "Keresés",
      href: "/search",
    },
    {
      label: "Rólunk",
      href: "/about",
    },
    {
      label: "Kijelentkezés",
      href: "/logout",
    },
  ],
  links: {
    register: "/register",
    login: "/login",
    search: "/search",
  },
};
