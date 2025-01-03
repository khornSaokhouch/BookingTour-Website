"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react"; // Include icons
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";
import Link from "next/link"; // Import Link from next/link
// Placeholder login function (replace with actual logic)

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [error, setError] = useState(null); // State to handle errors
  const [isLoading, setIsLoading] = useState(false); // State to handle loading
  const router = useRouter(); // Use next/router for navigation
  const { login } = useAuthStore(); // Use login function from auth store

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const user = await login(email, password);

      // Debugging log
      console.log("Logged-in User:", user);

      // Redirect based on user role
      switch (user.role) {
        case "admin":
          router.push("/admin/dashboard-admin");
          break;
        case "subadmin":
          router.push("/subadmin/dashboard-subadmin");
          break;
        default:
          router.push("/profile");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg w-[900px] overflow-hidden">
        {/* Left Side: Form */}
        <div className="w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-4 text-center">Welcome Back!</h1>
          <p className="text-sm text-center mb-6 text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500 underline">
              Sign up
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500 mr-2"
                />
                Remember me
              </label>
              <a href="/forgot-password" className="text-blue-500 underline">
                Forgot password?
              </a>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-300" />
            <span className="mx-4 text-gray-500">or continue with</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Social Login */}
          <div className="flex space-x-4">
            <Button className="flex-1 bg-blue-600 text-white flex items-center justify-center space-x-1">
              <img src="/facebook.png" alt="Facebook" className="w-5 h-5" />
              <span>Log in with Facebook</span>
            </Button>
            <Button className="flex-1 bg-blue-600 text-white flex items-center justify-center space-x-1">
              <img src="/google.png" alt="Google" className="w-5 h-5" />
              <span>Log in with Google</span>
            </Button>
          </div>
        </div>

        {/* Right Side: Illustration */}
        <div className="w-1/2 bg-gray-50 flex items-center justify-center">
          <img src="/image.png" alt="Login Illustration" className="w-3/4" />
        </div>
      </div>
    </div>
  );
}

// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Mail, Lock } from 'lucide-react'
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { useAuthStore } from "@/store/authStore"
// import { useNavigate } from 'react-router-dom'

// export default function LoginPage() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//  const { login, isLoading, error } = useAuthStore();
//  const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     await login(email, password);
//     navigate("/");
//   }

//   const inputVariants = {
//     focus: { scale: 1.05, transition: { duration: 0.3 } },
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white p-8 rounded-lg shadow-md w-96"
//       >
//         <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <motion.div whileFocus="focus" variants={inputVariants}>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="pl-10"
//                   required
//                 />
//               </div>
//             </motion.div>
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>
//             <motion.div whileFocus="focus" variants={inputVariants}>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="pl-10"
//                   required
//                 />
//               </div>
//             </motion.div>
//           </div>
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Button type="submit" className="w-full">
//              Login
//             </Button>
//           </motion.div>
//         </form>
//       </motion.div>
//     </div>
//   )
// }
