import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";

import { signup } from "../auth/authService";

export function SignupPage() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {

    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {

      await signup({
        name,
        email,
        password,
      });

      toast.success("Account created successfully!");

      navigate("/login");

    } catch (error: any) {

  toast.error(
    error?.response?.data?.detail ||
    "Signup failed."
  );

} finally {

      setLoading(false);

    }

  };

  return (

    <AuthLayout>

      <AuthCard>

        <h1 className="text-4xl font-bold text-white">

          Create Account 🚀

        </h1>

        <p className="mt-2 text-slate-400">

          Join WeatherOps AI today.

        </p>

        <form
          onSubmit={handleSignup}
          className="mt-8 space-y-5"
        >

          <div>

            <label className="text-sm text-slate-300">

              Full Name

            </label>

            <div className="mt-2 flex items-center rounded-xl border border-slate-700 bg-slate-900 px-4">

              <User className="text-slate-500" size={18} />

              <input

                className="w-full bg-transparent p-3 outline-none"

                placeholder="Your Name"

                value={name}

                onChange={(e)=>setName(e.target.value)}

              />

            </div>

          </div>

          <div>

            <label className="text-sm text-slate-300">

              Email

            </label>

            <div className="mt-2 flex items-center rounded-xl border border-slate-700 bg-slate-900 px-4">

              <Mail className="text-slate-500" size={18} />

              <input

                className="w-full bg-transparent p-3 outline-none"

                placeholder="Email"

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

              <Lock className="text-slate-500" size={18} />

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
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>

            </div>

          </div>

          <div>

            <label className="text-sm text-slate-300">

              Confirm Password

            </label>

            <div className="mt-2 flex items-center rounded-xl border border-slate-700 bg-slate-900 px-4">

              <Lock className="text-slate-500" size={18} />

              <input

                className="w-full bg-transparent p-3 outline-none"

                type={showConfirmPassword ? "text" : "password"}

                placeholder="Confirm Password"

                value={confirmPassword}

                onChange={(e)=>setConfirmPassword(e.target.value)}

              />

              <button
                type="button"
                onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
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

              "Creating Account..."

                :

              <>

                Create Account

                <ArrowRight size={18}/>

              </>

            }

          </button>

        </form>

        <p className="mt-6 text-center text-slate-400">

          Already have an account?

          <Link

            to="/login"

            className="ml-2 text-cyan-400 hover:text-cyan-300"

          >

            Login

          </Link>

        </p>

      </AuthCard>

    </AuthLayout>

  );

}