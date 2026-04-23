import dashoardRoutes from "./dashboard.routes";

const clientRoutes = [
  {
    children: [
      {
        path: "/",
        children: [
          ...dashoardRoutes,
        ]
      }
    ]
  }
]

export default clientRoutes;