import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import { loginThunk } from "@/features/auth/auth.thunk";
import { getRedirectPath } from "@/utils/jwt";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(loginThunk(form));

    if (loginThunk.fulfilled.match(result)) {
      toast.success("Đăng nhập thành công");
      const redirectPath = getRedirectPath();
      navigate(redirectPath);
    } else {
      toast.error("Đăng nhập thất bại");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-100">
      <div className="w-full max-w-md p-6 bg-white shadow rounded-2xl">
        <h1 className="mb-6 text-2xl font-bold text-center">Đăng nhập</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl border-border"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl border-border"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white bg-violet-600 rounded-xl"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
