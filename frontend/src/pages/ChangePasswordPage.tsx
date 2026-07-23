import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { changePassword } from "../auth/authService";

export function ChangePasswordPage() {

    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (newPassword !== confirmPassword) {

            toast.error("Passwords do not match.");

            return;

        }

        setLoading(true);

        try {

            const res = await changePassword({

                current_password: currentPassword,

                new_password: newPassword,

            });

            if (!res.success) {

                toast.error(res.message);

                return;

            }

            toast.success("Password changed successfully.");

            navigate("/profile");

        } catch {

            toast.error("Unable to change password.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="mx-auto mt-10 max-w-xl rounded-xl bg-slate-900 p-8">

            <h1 className="mb-8 text-3xl font-bold">

                Change Password

            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e)=>
                        setCurrentPassword(
                            e.target.value
                        )
                    }
                    className="w-full rounded-lg bg-slate-800 p-3"
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e)=>
                        setNewPassword(
                            e.target.value
                        )
                    }
                    className="w-full rounded-lg bg-slate-800 p-3"
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e)=>
                        setConfirmPassword(
                            e.target.value
                        )
                    }
                    className="w-full rounded-lg bg-slate-800 p-3"
                />

                <button
                    disabled={loading}
                    className="w-full rounded-lg bg-cyan-500 py-3 font-bold text-black"
                >

                    {loading
                        ? "Updating..."
                        : "Change Password"}

                </button>

            </form>

        </div>

    );

}