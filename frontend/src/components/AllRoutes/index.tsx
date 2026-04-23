import adminRoutes from "@/routes/admin/index.routes";
import commonRoutes from "@/routes/common/index.route";
import { useRoutes } from "react-router-dom";

const AllRoutes = () => {
  const elements = useRoutes([
    ...commonRoutes,
    ...adminRoutes
  ]);

  return (
    elements
  )
}

export default AllRoutes;