import { useState } from "react";
import { Trash2 } from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
    onDelete: (password: string) => void;
}

export default function DeleteAccountDialog({
    open,
    onClose,
    onDelete,
}: Props) {

    const [password, setPassword] = useState("");

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

            <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8">

                <div className="flex items-center gap-3 text-red-500">

                    <Trash2 size={28} />

                    <h2 className="text-2xl font-bold">

                        Delete Account

                    </h2>

                </div>

                <p className="mt-5 text-slate-400">

                    This action cannot be undone.
                    Enter your password to confirm.

                </p>

                <input
                    type="password"
                    placeholder="Password"
                    className="mt-6 w-full rounded-lg bg-slate-800 p-3"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="rounded-lg bg-slate-700 px-5 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => onDelete(password)}
                        className="rounded-lg bg-red-600 px-5 py-2"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

}