import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../auth/AuthContext";

export default function UserMenu() {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        toast.success("Logged out successfully");

        navigate("/login");

    };

    return (

        <Menu as="div" className="relative">

            <MenuButton className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 hover:bg-slate-800 transition">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-bold text-black">

                    {user?.name?.charAt(0).toUpperCase()}

                </div>

                <div className="hidden text-left lg:block">

                    <p className="text-sm font-semibold text-white">

                        {user?.name}

                    </p>

                    <p className="text-xs text-slate-400">

                        {user?.email}

                    </p>

                </div>

                <ChevronDown size={18} />

            </MenuButton>

            <MenuItems
                anchor="bottom end"
                className="mt-2 w-64 rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-2xl"
            >

                <MenuItem>

    <button

        onClick={() => navigate("/profile")}

        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-800"

    >

        <User size={18}/>

        My Profile

    </button>

</MenuItem>

                <MenuItem>

    <button

        onClick={() => navigate("/settings")}

        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-800 transition"

    >

        <Settings size={18} />

        Settings

    </button>

</MenuItem>

                <hr className="my-2 border-slate-700"/>

                <MenuItem>

                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-400 hover:bg-red-500/10"
                    >

                        <LogOut size={18} />

                        Logout

                    </button>

                </MenuItem>

            </MenuItems>

        </Menu>

    );

}