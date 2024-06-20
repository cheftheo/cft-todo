"use client";

import { FormEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { error } from 'console';

export default function SingUpRoute() {
    const router = useRouter()

    const [errorMsg, showError] = useState('')

    async function handleRegister(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
     
        const formData = new FormData(event.currentTarget)
        const mail = formData.get('email')
        const password = formData.get('password')
        const username = formData.get('username')
  
        try {
          const resp = await fetch("http://localhost:3000/api/register", {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              mail: mail,
              password: password,
              username: username
            }),
          })
          
          if (resp.status === 200) {
            router.push('/dashboard')
          } else {
            // set the state to show the error message from the response
            console.log(await resp.json())
            // showError(await resp.json()) 
          }
        }
        catch(err) {throw err}
      }

    return (
        <div className="absolute w-full h-full bg-zinc-800 text-white">
            <div className="flex flex-col align-center justify-center items-center mt-24">
                <div className="text-3xl font-bold text-lime-600">Sign In</div>
                <div className="absolute top-[20%] w-[22%] h-fit">
                    <form className="flex flex-col gap-y-4 p-4" onSubmit={handleRegister}>
                        <input type="text" name="email" placeholder="Email" className="text-lime-600 p-3 outline outline-1 outline-zinc-400 focus:outline-lime-600 bg-transparent rounded-xl" />
                        <input type="text" name="username" placeholder="Username" className="text-lime-600 p-3 outline outline-1 outline-zinc-400 focus:outline-lime-600 bg-transparent rounded-xl" />

                        <input type="password" name="password" placeholder="Password" className="text-lime-600 p-3 outline outline-1 outline-zinc-400 focus:outline-lime-600 bg-transparent rounded-xl" />
                        <input type="password2" name="password2" placeholder="Repeat password" className="text-lime-600 p-3 outline outline-1 outline-zinc-400 focus:outline-lime-600 bg-transparent rounded-xl" />

                        {errorMsg && <div className="text-red-500 text-center">{errorMsg}</div>}

                        <button className="transition-all bg-lime-700 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded-xl" type='submit'>Register</button>
                        <button className="transition-all bg-teal-800 hover:bg-teal-900 text-gray-200 font-bold p-1 rounded-xl">Have an account?</button>
                    </form>
                </div>
            </div>
        </div>
    )
}