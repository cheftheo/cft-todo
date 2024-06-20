"use client"

import { useState, useEffect } from "react"

export default function Dashboard() {
    const [posts, setPosts] = useState({})

    useEffect(() => {
        const allPosts = fetch("http://localhost:3000/api/getposts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        allPosts.then(res => res.json()).then(data => {
            setPosts(data)
        })
    }, [])

    return (
        <main>
            {/* profile */}
            <div className="absolute flex w-4/12 h-1/6 bg-zinc-300 rounded-3xl">
                <div className="flex flex-col gap-y-2 p-4">
                    <div className="text-2xl font-bold">Username: </div>
                </div>
            </div>

        </main>
    )
}