import { useState, useEffect } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import google from "../../assets/svgs/google.svg"

const SpinnerLoader = ({ size = "w-6 h-6", color = "border-purple-500" }) => (
  <div
    className={`${size} border-4 border-gray-200 ${color} flex border-t-transparent rounded-full animate-spin`}
  ></div>
);

export default function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const pingServer = async () => {
    try {
      await axios.get("https://error-logger.onrender.com/");
    } catch (err) {
      toast.error("Server wake-up failed");
    }
  };

  const signupWithRetry = async (payload, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await axios.post("https://error-logger.onrender.com/api/auth/register", payload);
      } catch (err) {
        if (i === retries - 1) throw err;
        await new Promise((res) => setTimeout(res, 3000));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, agreeToTerms } = formData;
    if (!firstName || !lastName || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    if (!agreeToTerms) {
      toast.error("You must agree to the Terms & Conditions.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    toast("Waking up server, please wait...", { duration: 3000 });
    await pingServer();

    try {
      const response = await signupWithRetry({
        email,
        password,
        username: `${firstName} ${lastName}`,
      });
      toast.success("Signup successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    toast("Waking up server, please wait...", { duration: 5000 });
    await pingServer();
    window.location.href = "https://error-logger.onrender.com/api/auth/google";
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Left Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-800 relative">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 p-8 w-full flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-wider">ERROR LOGGER</h1>
            <Link to="/" className="flex items-center gap-2 text-sm hover:text-purple-200">
              <ArrowLeft className="w-4 h-4" />
              Back to website
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center text-center">
            <div>
              <h2 className="text-4xl font-bold">Capturing Errors,<br />Creating Solutions</h2>
              <p className="text-purple-100 mt-4">Join thousands of developers monitoring their applications.</p>
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 bg-white/50 rounded-full" />
            <div className="w-2 h-2 bg-white rounded-full" />
            <div className="w-2 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </div>

      {/* Signup Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-6">
            <h1 className="text-2xl font-bold">ERROR LOGGER</h1>
            <Link to="/" className="text-purple-400 hover:text-purple-300 text-sm">← Back to website</Link>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold">Create an account</h2>
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link to="/loginpage" className="text-purple-400 hover:text-purple-300">Log in</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className=" w-full">
              <input
                name="UserName"
                placeholder="User name"
                value={formData.firstName}
                onChange={handleChange}
                className="p-2 bg-gray-800 text-white border border-gray-600 rounded"
                required
              />
            
            </div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
              required
            />
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <span>
                I agree to the{" "}
                <Link to="/terms" className="text-purple-400 hover:text-purple-300">
                  Terms & Conditions
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded text-white flex items-center justify-center"
            >
              {loading ? <SpinnerLoader /> : "Create Account"}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Or register with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={loginWithGoogle}
                className="bg-gray-800 flex gap-2 justify-center border border-gray-700 text-white p-2 rounded hover:bg-gray-700"
              >
                <img src={google} alt="" className="w-6"/>
                Google
              </button>
             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
