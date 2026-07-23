import { useState } from "react";
import {
  User,
  Mail,
  Shield,
  Lock,
  KeyRound,
  Trash2,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../auth/useAuth";
import { deleteAccount } from "../auth/authService";
import DeleteAccountDialog from "../components/DeleteAccountDialog";

export function ProfilePage() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async (password: string) => {
    try {
      const res = await deleteAccount(password);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      localStorage.clear();

      toast.success("Account deleted successfully.");

      navigate("/login");
    } catch {
      toast.error("Unable to delete account.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

        {/* Header */}

        <div className="flex items-center gap-6">

          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-cyan-500 text-5xl font-bold text-black">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-4xl font-bold text-white">
              {user?.name}
            </h1>

            <p className="mt-2 text-slate-400">
              WeatherOps AI User
            </p>
          </div>

        </div>

        {/* Cards */}

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          {/* Name */}

          <div className="min-h-[180px] rounded-2xl bg-slate-950 p-6">

            <div className="flex items-center gap-3">

              <User
                className="text-cyan-400"
                size={22}
              />

              <span className="text-slate-300">
                Name
              </span>

            </div>

            <p className="mt-6 break-all text-2xl font-medium text-white">
              {user?.name}
            </p>

          </div>

          {/* Email */}

          <div className="min-h-[180px] rounded-2xl bg-slate-950 p-6">

            <div className="flex items-center gap-3">

              <Mail
                className="text-cyan-400"
                size={22}
              />

              <span className="text-slate-300">
                Email
              </span>

            </div>

            <p className="mt-6 break-all text-2xl font-medium text-white">
              {user?.email}
            </p>

          </div>

          {/* Account */}

          <div className="min-h-[180px] rounded-2xl bg-slate-950 p-6">

            <div className="flex items-center gap-3">

              <Shield
                className="text-cyan-400"
                size={22}
              />

              <span className="text-slate-300">
                Account Type
              </span>

            </div>

            <p className="mt-6 text-2xl font-medium text-white">
              Research User
            </p>

          </div>

          {/* Security */}

          <div className="min-h-[180px] rounded-2xl bg-slate-950 p-6">

            <div className="flex items-center gap-3">

              <Lock
                className="text-cyan-400"
                size={22}
              />

              <span className="text-slate-300">
                Security
              </span>

            </div>

            <div className="mt-6 flex flex-col gap-3">

              <Link
                to="/change-password"
                className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 font-semibold text-black transition hover:bg-cyan-400"
              >
                <KeyRound size={18} />
                Change Password
              </Link>

              <button
                onClick={() => setOpenDelete(true)}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-500"
              >
                <Trash2 size={18} />
                Delete Account
              </button>

            </div>

          </div>

        </div>

      </div>

      <DeleteAccountDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onDelete={handleDelete}
      />

    </div>
  );
}