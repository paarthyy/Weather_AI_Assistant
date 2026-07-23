import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props{

    children:ReactNode;

}

export default function AuthCard({children}:Props){

    return(

        <motion.div

            initial={{opacity:0,y:30}}

            animate={{opacity:1,y:0}}

            transition={{duration:.6}}

            className="w-[430px]
            rounded-3xl
            border
            border-white/10
            bg-white/10
            backdrop-blur-xl
            p-10
            shadow-2xl"

        >

            {children}

        </motion.div>

    )

}