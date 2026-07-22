import { User, Mail, Shield } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

export function ProfilePage() {

    const { user } = useAuth();

    return (

        <div className="mx-auto max-w-5xl">

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

                <div className="flex items-center gap-6">

                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-cyan-500 text-5xl font-bold text-black">

                        {user?.name.charAt(0).toUpperCase()}

                    </div>

                    <div>

                        <h1 className="text-4xl font-bold">

                            {user?.name}

                        </h1>

                        <p className="mt-2 text-slate-400">

                            WeatherOps AI User

                        </p>

                    </div>

                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2">

                    <div className="rounded-xl bg-slate-950 p-6">

                        <div className="flex items-center gap-3">

                            <User className="text-cyan-400"/>

                            <span>Name</span>

                        </div>

                        <p className="mt-4 text-xl">

                            {user?.name}

                        </p>

                    </div>

                    <div className="rounded-xl bg-slate-950 p-6">

                        <div className="flex items-center gap-3">

                            <Mail className="text-cyan-400"/>

                            <span>Email</span>

                        </div>

                        <p className="mt-4 text-xl">

                            {user?.email}

                        </p>

                    </div>

                    <div className="rounded-xl bg-slate-950 p-6">

                        <div className="flex items-center gap-3">

                            <Shield className="text-cyan-400"/>

                            <span>Account Type</span>

                        </div>

                        <p className="mt-4 text-xl">

                            Research User

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}