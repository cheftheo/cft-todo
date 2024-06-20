"use client"
import { useRouter } from "next/navigation";

const Footer = () => {
    const router = useRouter();

    return (
        <div className="w-full bg-zinc-700 rounded-t-xl absolute top-full">
            <div className="flex flex-col justify-center align-center items-center p-5 text-white">
                <button className="transition-all hover:text-yellow-500 text-white font-bold"
                    onClick={() => {router.push("https://github.com/cheftheo")}}
                >cheftheo is the boss</button>
            </div>        
        </div>
    )
}

export default Footer;