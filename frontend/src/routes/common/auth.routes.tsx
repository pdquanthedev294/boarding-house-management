import Login from "@/pages/common/Auth/Login"
import Register from "@/pages/common/Auth/Register";

const authRoutes = [
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
];

export default authRoutes;