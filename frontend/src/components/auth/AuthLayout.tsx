import { ReactNode } from "react";
import { CloudRain } from "lucide-react";

interface Props{
    children:ReactNode;
}

export default function AuthLayout({children}:Props){

    return(

        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950">

            <div className="absolute inset-0">

                <div className="absolute -top-60 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px]" />

                <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[150px]" />

            </div>

            <div className="absolute top-8 left-10 flex items-center gap-3">

                <CloudRain
                    className="text-cyan-400"
                    size={34}
                />

                <div>

                    <h1 className="text-white font-bold text-2xl">

                        WeatherOps AI

                    </h1>

                    <p className="text-slate-400 text-sm">

                        Next Generation Weather Intelligence

                    </p>

                </div>

            </div>

            {children}

        </div>

    )

}