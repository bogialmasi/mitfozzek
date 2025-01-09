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
      label: "Profil",
      href: "/profile",
    },
    {
      label: "Kijelentkezés",
      href: "/logout",
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
    about: "/about",
    profile: "/profile",
    recipe: "/recipe",
    github: "https://github.com/bogialmasi/mitfozzek"
  },
  profileMenuItems: {
    modifyProfile: "profile/edit",
    favRecipes: "/profile/favorites",
    addRecipe: "/recipe/add",
    myRecipes: "/recipe/myrecipes"
  }
};
