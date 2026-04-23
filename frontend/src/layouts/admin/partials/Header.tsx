import { logoutThunk } from "@/features/auth/auth.thunk";
import { useAppDispatch } from "@/store/hooks";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutThunk());

    navigate("/login");
  };

  return (
    <header className="top-0 z-[999] w-full border-b border-border bg-gradient-glass backdrop-blur-xl shadow-soft">
      <div className="px-6">
        <div className="flex items-center h-14">
        
          <div className="w-3/12">
            <Link
              to="/admin/dashboard"
              className="text-xl font-extrabold tracking-wide text-primary"
            >
              ADMIN
            </Link>
          </div>

          <div className="w-9/12 text-right">
            <Link
              to="/admin/profile"
              className="mr-2 inline-flex items-center rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              My account
            </Link>

            <button 
              onClick={handleLogout}
              className="inline-flex items-center rounded-md bg-destructive px-4 py-1.5 text-sm font-medium text-destructive-foreground shadow-sm transition hover:opacity-90"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;