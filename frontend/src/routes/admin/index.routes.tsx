import AdminLayout from "@/layouts/admin/AdminLayout";
import RequireAuth from "@/components/RequireAuth";
import dashoardRoutes from "./dashboard.routes";

const adminRoutes = [
  {
    children: [
      {
        path: "/admin",
        element: (
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        ),
        children: [
          ...dashoardRoutes,
        ]
      }
    ]
  }
]

export default adminRoutes;