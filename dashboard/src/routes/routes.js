import { City } from "../components/city/city";
import { Dashboard } from "../components/dashboard/dashboard";
import { Places } from "../components/dashboard/places/places";
import { Rating } from "../components/dashboard/rating/rating";
import { Setting } from "../components/dashboard/setting/setting";
import { Login } from "../components/login/login";
import All from "../components/profile/all/all";
import AllCities from "../components/city/all/all";
import { Profile } from "../components/profile/profile";
import { Service } from "../components/service/service";
import AllServices from "../components/service/all/all";

export const Routes = [
  {
    path: "/",
    exact: true,
    protected: false,
    component: Login,
  },
  {
    path: "/dashboard",
    exact: true,
    protected: true,
    component: Dashboard,
  },
  {
    path: "/profile",
    exact: true,
    protected: true,
    component: Profile,
  },
  {
    path: "/profile/all",
    exact: true,
    protected: true,
    component: All,
  },
  {
    path: "/cities/all",
    exact: true,
    protected: true,
    component: AllCities,
  },
  {
    path: "/setting",
    exact: true,
    protected: true,
    component: Setting,
  },
  {
    path: "/places",
    exact: true,
    protected: true,
    component: Places,
  },
  {
    path: "/cities",
    exact: true,
    protected: true,
    component: City,
  },
  {
    path: "/services",
    exact: true,
    protected: true,
    component: Service,
  },
  {
    path: "/services/all",
    exact: true,
    protected: true,
    component: AllServices,
  },
  {
    path: "/rating/:id",
    exact: true,
    protected: true,
    component: Rating,
  },
];
