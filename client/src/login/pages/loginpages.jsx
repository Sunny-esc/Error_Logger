import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import google from "../../assets/svgs/google.svg"
// Spinner while logging in
const SpinnerLoader = ({ size = "w-6 h-6", color = "border-purple-500" }) => (
  <div className={`${size} border-4 border-gray-200 ${color} border-t-transparent rounded-full animate-spin`}></div>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const pingServer = async () => {
    try {
      await axios.get("http://localhost:3000/");
    } catch (err) {
      console.warn("Ping failed — probably sleeping");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    setLoading(true);
    toast("Waking up server, please wait...", { duration: 3000 });
    await pingServer();

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    toast("Waking up server, please wait...", { duration: 5000 });
    await pingServer();
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Side - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-purple-600 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-between p-8 text-white w-full">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold tracking-wider">ERROR LOGGER</div>
            <Link to="/" className="flex items-center gap-2 text-sm hover:text-purple-200">
              <ArrowLeft className="w-4 h-4" />
              Back to website
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Tracking Errors,<br />
                Building Solutions
              </h1>
              <p className="text-lg text-purple-100">
                Monitor your applications with precision and clarity
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full" />
            <div className="w-2 h-2 bg-white/50 rounded-full" />
            <div className="w-2 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full" />
          <div className="absolute bottom-32 right-16 w-24 h-24 border border-white/20 rounded-full" />
          <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-white/20 rounded-full" />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden text-center">
            <h1 className="text-2xl font-bold text-white mb-2">ERROR LOGGER</h1>
            <Link to="/" className="text-purple-400 text-sm hover:text-purple-300">← Back to website</Link>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white">Welcome back</h2>
            <p className="text-gray-400">
              Don&apos;t have an account?{" "}
              <Link to="/signuppage" className="text-purple-400 hover:text-purple-300">Sign up</Link>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-300 mb-1">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

           

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <SpinnerLoader /> : "Sign in"}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={loginWithGoogle}
                className="bg-gray-800 flex gap-2 border space-x-3 border-gray-700 text-white py-2 rounded hover:bg-gray-700 items-center justify-center"
              >
              <img src={google} alt="" className="w-6 " />
                Google
              </button>
             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
