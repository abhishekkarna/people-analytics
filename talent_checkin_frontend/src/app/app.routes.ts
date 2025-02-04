import { Routes } from "@angular/router";
import { AuthGuard, LoginGuard } from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "authentication",
        loadChildren: () =>
          import("./pages/authentication/authentication.routes").then(
            (m) => m.AuthenticationRoutes
          ),
        canActivate: [LoginGuard],
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./pages/pages.routes").then((m) => m.PagesRoutes),
        canActivate: [AuthGuard],
      },
      // { path: "", redirectTo: "/dashboard", pathMatch: "full" },
      { path: "**", redirectTo: "/authentication" },
    ],
  },
  {
    path: "**",
    redirectTo: "/authentication",
  },
];
