export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Mit főzzek?",
  description: "Make beautiful websites regardless of your design experience.",
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
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    register: "/register",
    login: "/login",
    search: "/search",
  },
};
