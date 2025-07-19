import { ISidebarRoute } from "../interface/interface";
import { roles } from "../interface/role";

export const sidebarRouteList: Record<roles, ISidebarRoute[]> = {
  admin: [
    {
      name: "Dashboard",
      link: "/admin",
    },
    { name: "Test", link: "/test" },
  ],
  user: [
    {
      name: "BMI Calculator",
      link: "/",
    },
    {
      name: "My Profile",
      link: "/myprofile",
    },
    {
      name: "My Diet Plan",
      link: "/dietplan",
    },
    // { name: "Test", link: "/test" },
  ],
  guest: [
    {
      name: "Dashboard",
      link: "/",
    },
    { name: "Test", link: "/test" },
  ],
};
