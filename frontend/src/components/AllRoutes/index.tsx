import React from 'react'
import commonRoutes from "@/routes/common/index.route";
import { useRoutes } from "react-router-dom";

const AllRoutes = () => {
  const elements = useRoutes([
    ...commonRoutes,
  ]);

  return (
    elements
  )
}

export default AllRoutes;