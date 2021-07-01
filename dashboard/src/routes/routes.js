import { Dashboard } from "../components/dashboard/dashboard";
import { Places } from "../components/dashboard/places/places";
import { Rating } from "../components/dashboard/rating/rating";
import { Setting } from "../components/dashboard/setting/setting";
import { Login } from "../components/login/login";
import All from "../components/profile/all/all";
import { Profile } from "../components/profile/profile";

export const Routes = [
  {
    path: "/",
    exact: true,
    component: Login,
  },
  {
    path: "/dashboard",
    exact: true,
    component: Dashboard,
  },
  {
    path: "/profile",
    exact: true,
    component: Profile,
  },
  {
    path: "/profile/all",
    exact: true,
    component: All,
  },
  {
    path: "/setting",
    exact: true,
    component: Setting,
  },
  {
    path: "/places",
    exact: true,
    component: Places,
  },
  {
    path: "/rating",
    exact: true,
    component: Rating,
  },
];
