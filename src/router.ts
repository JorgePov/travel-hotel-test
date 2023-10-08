import { createBrowserRouter } from "react-router-dom";

import Login from "./components/Login/Login";
import Loginww from "./components/Login/Loginsww";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  { path: "*", Component: Loginww },
]);
