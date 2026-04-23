import AdminLayout from "@/layouts/admin/AdminLayout";
import dashoardRoutes from "./dashboard.routes";

const adminRoutes = [
  {
    children: [
      {
        path: "/admin",
        element: <AdminLayout/>,
        children: [
          ...dashoardRoutes,
        ]
      }
    ]
  }
]

export default adminRoutes;