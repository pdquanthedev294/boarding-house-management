import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
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
  const { step, forgotEmail, loading, otpExpire } = useAppSelector(
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
    await dispatch(forgotPasswordThunk({ email }));
  };

  // STEP 2
  const handleVerify = async () => {
    await dispatch(verifyOtpThunk({ email: forgotEmail!, otp }));
  };

  // resend
  const handleResend = async () => {
    await dispatch(resendOtpThunk({ email: forgotEmail! }));
  };

  // STEP 3
  const handleReset = async () => {
    if (password !== confirm) return alert("Không khớp");

    await dispatch(
      resetPasswordThunk({
        email: forgotEmail!,
        newPassword: password,
        confirmPassword: confirm,
      })
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[350px] p-6 bg-white rounded-2xl shadow">

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2 className="mb-4 text-xl font-bold">Quên mật khẩu</h2>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              className="w-full mt-3"
              onClick={handleSend}
              disabled={loading}
            >
              {loading ? "Đang gửi..." : "Gửi mã"}
            </Button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="mb-4 text-xl font-bold">Nhập OTP</h2>
            <Input
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <Button
              className="w-full mt-3"
              onClick={handleVerify}
              disabled={loading}
            >
              Xác nhận
            </Button>

            <div className="mt-2 text-sm text-gray-500">
              {timeLeft > 0 ? `Gửi lại sau ${timeLeft}s` : ""}
            </div>

            <Button
              variant="ghost"
              disabled={timeLeft > 0}
              onClick={handleResend}
            >
              Gửi lại OTP
            </Button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2 className="mb-4 text-xl font-bold">Đặt lại mật khẩu</h2>

            <Input
              type="password"
              placeholder="Mật khẩu mới"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Nhập lại"
              className="mt-2"
              onChange={(e) => setConfirm(e.target.value)}
            />

            <Button
              className="w-full mt-3"
              onClick={handleReset}
              disabled={loading}
            >
              Đổi mật khẩu
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;