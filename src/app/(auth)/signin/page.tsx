"use client";

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
// import { cookies } from "next/headers"
// import config from '../../../../CONFIG.json'
// import myProfileCook from "../cookies"

export default function SignInRoute() {
    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
   
      const formData = new FormData(event.currentTarget)
      const mail = formData.get('email')
      const password = formData.get('password')

      try {
        fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { 
              'Content-Type': 'application/json',
            },
          body: JSON.stringify({
            mail: mail,
            password: password,
          }),
        }).then((res) => res.json())
        .then((data) => {
          myProfileCook("user", data.userData.username)
          router.push('/dashboard')
          // cookies().set("user", data.userData.username)
        })

        // const resp = await fetch("http://localhost:3000/api/login", {
        //   method: 'POST',
        //   headers: { 
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     mail: mail,
        //     password: password,
        //   }),
        // })

        // if (resp.status === 200) {

          // cookies().set('user', resp.userData.Username)

          // router.push('/dashboard')
        // }
      }
      catch(err) {throw err}
    }

    return (
        <div className="absolute w-full h-full bg-zinc-800 text-white">
            <div className="flex flex-col align-center justify-center items-center mt-24">
                <div className="text-3xl font-bold text-lime-600">Sign In</div>
                <div className="absolute top-[20%] w-[22%] h-fit">
                    <form className="flex flex-col gap-y-4 p-4" onSubmit={handleSubmit}>
                        <input type="text" name="email" placeholder="Email" className="text-lime-600 p-3 outline outline-1 outline-zinc-400 focus:outline-lime-600 bg-transparent rounded-xl" />
                        <input type="password" name="password" placeholder="Password" className="text-lime-600 p-3 outline outline-1 outline-zinc-400 focus:outline-lime-600 bg-transparent rounded-xl" />

                        <button className="text-xs text-gray-300 hover:text-teal-600">Forgot your password?</button>

                        <button className="transition-all bg-lime-700 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded-xl" type='submit'>Sign In</button>
                        <button className="transition-all bg-teal-800 hover:bg-teal-900 text-gray-200 font-bold p-1 rounded-xl">Register page</button>
                    </form>
                </div>
            </div>
        </div>
    );
}