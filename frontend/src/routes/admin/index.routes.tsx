import AdminLayout from "@/layouts/admin/AdminLayout";
import RequireAuth from "@/components/common/RequireAuth";
import dashboardRoutes from "./dashboard.routes";
import roomRoutes from "./room.routes";

const adminRoutes = [
  {
    children: [
      {
        path: "/admin",
        element: (
          <RequireAuth
            allowedRoles={["ROLE_ADMIN", "ADMIN"]}
          >
            <AdminLayout />
          </RequireAuth>
        ),
        children: [
          ...dashboardRoutes,
          ...roomRoutes,
        ],
      },
    ],
  },
];

export default adminRoutes;