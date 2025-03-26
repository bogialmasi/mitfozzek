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
    shopping: "/shopping",
    github: "https://github.com/bogialmasi/mitfozzek"
  },
  profileMenuItems: {
    modifyProfile: "/profile/edit",
    modifyPantry: "/profile/editpantry",
    favRecipes: "/profile/favorites",
    addRecipe: "/newrecipe",
    myRecipes: "/recipe/myrecipes",
    shoppingLists: "/shopping"
  },
  adminItems: {
    adminPage: "/admin",
    users: "/admin/users",
    reviews: "/admin/reviews",
  }
};
