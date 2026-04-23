import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block border-b border-sidebar-border px-[10px] py-[6px] transition
    ${
      isActive
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
        : "hover:bg-sidebar-accent/60"
    }`;

  return (
    <aside className="border-r w-50 shrink-0 bg-muted text-sidebar-foreground border-border">
      <div className="inner-menu">
        <ul className="p-0 m-0 list-none">
          <li>
            <NavLink to="/admin/dashboard" className={linkClass}>
              Tổng quan
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/buildings" className={linkClass}>
              Danh sách toà nhà
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/roles" className={linkClass}>
              Danh sách nhóm quyền
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/users" className={linkClass}>
              Danh sách người dùng
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/customers" className={linkClass}>
              Danh sách khách hàng
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/transactions" className={linkClass}>
              Danh sách giao dịch
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/activity-logs"
              className={({ isActive }) =>
                `block border-b border-sidebar-border px-[10px] py-[6px] transition 
                ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "hover:bg-sidebar-accent/60"
                }`
              }
            >
              Nhật ký hoạt động
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/mails"
              className={({ isActive }) =>
                `block border-b border-sidebar-border px-[10px] py-[6px] transition 
                ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "hover:bg-sidebar-accent/60"
                }`
              }
            >
              Gửi email
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/email-logs"
              className={({ isActive }) =>
                `block border-b border-sidebar-border px-[10px] py-[6px] transition 
                ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "hover:bg-sidebar-accent/60"
                }`
              }
            >
              Lịch sử email
            </NavLink>
          </li>
          
           <li>
            <NavLink
              to="/admin/contact-requests"
              className={({ isActive }) =>
                `block border-b border-sidebar-border px-[10px] py-[6px] transition 
                ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "hover:bg-sidebar-accent/60"
                }`
              }
            >
              Yêu cầu liên hệ
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
