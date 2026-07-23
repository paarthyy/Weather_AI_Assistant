import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";

import { login as loginAPI } from "../auth/authService";
import { useAuth } from "../auth/useAuth";

export function LoginPage() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await loginAPI({
        email,
        password,
      });
      if (!res.success) {
        toast.error(res.message);
        return;
    }

      login(res.user);

      localStorage.setItem(
          "token",
          res.token
      );

      toast.success(`Welcome back, ${res.user.name}!`);

            navigate("/dashboard");

    } catch (error) {

    if (axios.isAxiosError(error)) {

        toast.error(
            error.response?.data?.detail ??
            "Invalid Email or Password"
        );

    } else {

        toast.error("Something went wrong.");

    }

} finally {

    setLoading(false);

}
  };

  return (

    <AuthLayout>

      <AuthCard>

        <h1 className="text-4xl font-bold text-white">

          Welcome Back 👋

        </h1>

        <p className="mt-2 text-slate-400">

          Login to your WeatherOps AI account.

        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

          <div>

            <label className="text-sm text-slate-300">

              Email

            </label>

            <div className="mt-2 flex items-center rounded-xl border border-slate-700 bg-slate-900 px-4">

              <Mail
                className="text-slate-500"
                size={18}
              />

              <input

                className="w-full bg-transparent p-3 outline-none"

                placeholder="Enter your email"

                value={email}

                onChange={(e)=>setEmail(e.target.value)}

              />

            </div>

          </div>

          <div>

            <label className="text-sm text-slate-300">

              Password

            </label>

            <div className="mt-2 flex items-center rounded-xl border border-slate-700 bg-slate-900 px-4">

              <Lock
                className="text-slate-500"
                size={18}
              />

              <input

                className="w-full bg-transparent p-3 outline-none"

                type={showPassword ? "text" : "password"}

                placeholder="Password"

                value={password}

                onChange={(e)=>setPassword(e.target.value)}

              />

              <button

                type="button"

                onClick={()=>setShowPassword(!showPassword)}

              >

                {

                  showPassword

                  ?

                  <EyeOff size={18}/>

                  :

                  <Eye size={18}/>

                }

              </button>

            </div>

          </div>

          <button

            disabled={loading}

            className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 font-semibold text-black transition hover:bg-cyan-400"

          >

            {

              loading

              ?

              "Logging In..."

              :

              <>

                Login

                <ArrowRight size={18}/>

              </>

            }

          </button>

        </form>

        <p className="mt-6 text-center text-slate-400">

          Don't have an account?

          <Link

            to="/signup"

            className="ml-2 text-cyan-400 hover:text-cyan-300"

          >

            Create one

          </Link>

        </p>

      </AuthCard>

    </AuthLayout>

  );
}
