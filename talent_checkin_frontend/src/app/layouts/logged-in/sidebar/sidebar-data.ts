import { NavItem } from "./nav-item/nav-item";

export const navItems: NavItem[] = [
  {
    navCap: "Home",
  },
  {
    displayName: "Dashboard",
    iconName: "layout-grid-add",
    route: "/dashboard",
  },
  {
    displayName: "Employees",
    iconName: "layout-grid-add",
    route: "/dashboard/employee",
  },
  // {
  //   displayName: "Analytical",
  //   iconName: "aperture",
  //   route: "https://modernize-angular-main.netlify.app/dashboards/dashboard1",
  //   external: true,
  //   chipClass: "bg-secondary text-white",
  // },
];
