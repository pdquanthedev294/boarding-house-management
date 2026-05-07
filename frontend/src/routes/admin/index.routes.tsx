import AdminLayout from "@/layouts/admin/AdminLayout";
import RequireAuth from "@/components/common/RequireAuth";
import dashoardRoutes from "./dashboard.routes";
import roomRoutes from "./room.routes";

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
          ...roomRoutes,
        ]
      }
    ]
  }
]

export default adminRoutes;