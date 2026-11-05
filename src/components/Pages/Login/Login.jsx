import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      localStorage.setItem("isAdminLoggedIn", "true");
      localStorage.setItem("adminUsername", username);

      window.dispatchEvent(new Event("authChange"));

      navigate("/dashboard");
    } else {
      setError("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
      dir="rtl"
    >
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex justify-center mb-8">
          <img
            src="https://www.digikala.com/brand/full-horizontal.svg"
            alt="Digikala"
            className="w-36"
          />
        </div>

        <h1 className="text-xl font-bold text-gray-800 mb-3">
          ورود به پنل مدیریت
        </h1>

        <p className="text-sm text-gray-500 mb-7">
          لطفاً نام کاربری و رمز عبور خود را وارد کنید
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نام کاربری
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              placeholder="نام کاربری را وارد کنید"
              className="input input-bordered w-full focus:outline-none focus:border-red-500"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رمز عبور
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="رمز عبور را وارد کنید"
              className="input input-bordered w-full focus:outline-none focus:border-red-500"
              dir="ltr"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="btn w-full bg-red-600 hover:bg-red-700 text-white border-none"
          >
            ورود به داشبورد
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-7">
          ورود شما به پنل مدیریت فروشگاه
        </p>
      </div>
    </div>
  );
};

export default Login;
