import RoomDetail from "@/pages/admin/Room/Roomdetail";
import RoomForm from "@/pages/admin/Room/Roomform";
import RoomList from "@/pages/admin/Room/RoomList";

const roomRoutes = [
  {
    path: "/admin/rooms",
    element: <RoomList />,
  },
  {
    path: "/admin/rooms/:id",
    element: <RoomDetail />,
  },
  {
    path: "/admin/rooms/add",
    element: <RoomForm />,
  },
  {
    path: "/admin/rooms/edit/:id",
    element: <RoomForm />,
  },
];

export default roomRoutes;