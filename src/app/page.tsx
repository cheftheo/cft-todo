"use client"

import config from '../../CONFIG.json'
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const router = useRouter()
  const handleClick = (where: string) => {
    if (where === 'login') {
      router.push('/signin')
    } else if (where === 'signup') {
      router.push('/signup')
    }
  }

  var dots = Array.from({length: 10}, (_, i) => {
    return <motion.div 
      key={i} 
      transition={{ delay: 1.0 + (0.12 * i), repeat: Infinity, repeatDelay: 1.5 }} 
      initial={{ y: 0 }}
      animate={{ y: 5 }}
      className={"w-2 h-2 "+ ("bg-zinc-400" || "bg-zinc-50") +" rounded-full"}>

    </motion.div>
  });

  return (
    <AnimatePresence>
      <main className="absolute w-full h-full bg-zinc-800">
        {/* <AuthLayout /> */}
        <div className='flex flex-col justify-center align-center items-center mt-16'>
          <div className='text-gray-200 font-black text-3xl mb-6'>Welcome!</div>
          <div className='text-gray-300 font-semibold w-1/2 text-pretty text-center'>{config.name}</div>
          <div className='text-gray-300 font-semibold w-1/2 text-pretty text-center'>{config.description}</div>

          <div className='flex flex-row gap-x-2 '>
            <button className='transition-all bg-lime-700 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded mt-6' onClick={
            () => {handleClick("login")}}>Log In</button>

            <button className='transition-all bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded mt-6' onClick={
            () => {handleClick("signup")}}>Sign up</button>
          </div>

          <div className='flex flex-row gap-x-2 mt-10'>{dots}</div>
        </div>

      </main>
    </AnimatePresence>
  );
}
