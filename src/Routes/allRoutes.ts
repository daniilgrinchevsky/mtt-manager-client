// Create Password
import {PAGE} from "../config/page";
import Tourneys from "../pages/Tourneys";
import Session from "../pages/Session";
import Analytics from "../pages/Analytics";

interface RouteObject {
  path: string;
  component: React.ComponentType<any>; // Use React.ComponentType to specify the type of the component
  exact?: boolean;
}

const authProtectedRoutes: Array<RouteObject> = [


  { path: PAGE.TOURNEYS.path, component: Tourneys },
  { path: PAGE.SESSION.path, component: Session },
  { path: PAGE.ANALYTICS.path, component: Analytics},
  { path: "/", component: Session },

]

export { authProtectedRoutes };
