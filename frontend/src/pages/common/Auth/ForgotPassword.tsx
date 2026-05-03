import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import {
  forgotPasswordThunk,
  verifyOtpThunk,
  resetPasswordThunk,
  resendOtpThunk,
} from "@/features/auth/auth.thunk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { step, forgotEmail, loading, otpExpire, error } = useAppSelector(
    (s) => s.auth
  );

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [timeLeft, setTimeLeft] = useState(0);

  // countdown OTP
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = otpExpire - Date.now();
      setTimeLeft(diff > 0 ? Math.floor(diff / 1000) : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpExpire]);

  // STEP 1
  const handleSend = async () => {
    if (!email.trim()) {
      toast.error("Vui lòng nhập email");
      return;
    }
    const result = await dispatch(forgotPasswordThunk({ email }));
    if (forgotPasswordThunk.fulfilled.match(result)) {
      toast.success("Mã OTP đã được gửi đến email");
    }
  };

  // STEP 2
  const handleVerify = async () => {
    if (!otp.trim()) {
      toast.error("Vui lòng nhập mã OTP");
      return;
    }
    const result = await dispatch(verifyOtpThunk({ email: forgotEmail!, otp }));
    if (verifyOtpThunk.fulfilled.match(result)) {
      toast.success("Xác thực OTP thành công");
    }
  };

  // resend
  const handleResend = async () => {
    const result = await dispatch(resendOtpThunk({ email: forgotEmail! }));
    if (resendOtpThunk.fulfilled.match(result)) {
      toast.success("Mã OTP mới đã được gửi");
    }
  };

  // STEP 3
  const handleReset = async () => {
    if (!password.trim() || !confirm.trim()) {
      toast.error("Vui lòng nhập mật khẩu");
      return;
    }
    if (password !== confirm) {
      toast.error("Mật khẩu không khớp");
      return;
    }
    const result = await dispatch(
      resetPasswordThunk({
        email: forgotEmail!,
        newPassword: password,
        confirmPassword: confirm,
      })
    );
    if (resetPasswordThunk.fulfilled.match(result)) {
      toast.success("Đặt lại mật khẩu thành công");
      navigate("/login");
    }
  };

  // Show error when appears
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow">
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2 className="mb-6 text-2xl font-bold text-center">Quên mật khẩu</h2>
            <div className="space-y-4">
              <Input
                placeholder="Nhập email của bạn"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <Button
                className="w-full"
                onClick={handleSend}
                disabled={loading}
              >
                {loading ? "Đang gửi..." : "Gửi mã OTP"}
              </Button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="mb-6 text-2xl font-bold text-center">Xác thực OTP</h2>
            <p className="mb-4 text-sm text-slate-600 text-center">
              Mã OTP đã được gửi đến {forgotEmail}
            </p>
            <div className="space-y-4">
              <Input
                placeholder="Nhập mã OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loading}
              />
              <Button
                className="w-full"
                onClick={handleVerify}
                disabled={loading}
              >
                Xác nhận
              </Button>

              <div className="text-center text-sm text-slate-600">
                {timeLeft > 0 ? (
                  <p>Gửi lại sau {timeLeft}s</p>
                ) : (
                  <button
                    onClick={handleResend}
                    disabled={loading}
                    className="font-medium text-violet-600 hover:text-violet-700 disabled:text-slate-400"
                  >
                    Gửi lại mã OTP
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2 className="mb-6 text-2xl font-bold text-center">Đặt lại mật khẩu</h2>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <Input
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                disabled={loading}
              />
              <Button
                className="w-full"
                onClick={handleReset}
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;