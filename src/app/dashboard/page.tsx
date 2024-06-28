"use client"

import { useCookies } from 'next-client-cookies';
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import React from 'react';

import { getUserPosts, updateUserPosts } from '../../lib/auth';

export default function Dashboard() {
    const cookies = useCookies()
    const router = useRouter()

    if (cookies.get('user') === undefined) router.push('/signin') ;

    const [posts, setPosts] = useState<any[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
    const [generalData, setGeneralData] = useState<{ totalTasks: number, doneTasks: number }>({ totalTasks: 0, doneTasks: 0 });

    // const wholePosts = getUserPosts();
    // wholePosts = [0: [title: "da"]]

    const fetchPosts = async () => {
        const userPosts = await getUserPosts(cookies.get('user'));
        setPosts(userPosts);
        setFilteredPosts(userPosts);
    };

    const calculateTotals = () => {
        var totalTasks = 0;
        var doneTasks = 0;

        Object.keys(posts).forEach((post: any) => {
            totalTasks++;
            console.log(posts[post])
            if (posts[post].done) doneTasks++;
        });

        setGeneralData({ totalTasks: totalTasks, doneTasks: doneTasks });
    }

    useEffect(() => {
        fetchPosts();
    }, []);
    
    useEffect(() => {
        calculateTotals();
    }, [posts]);

    const handleSearch = (term: any) => {
        const unfilteredPosts = Object.keys(posts).map((key: any) => posts[key]);
        const filtered = unfilteredPosts.filter((post: any) => post.title.toLowerCase().includes(term.toLowerCase()));
        
        setFilteredPosts(filtered);
    };

    const handleDone = (id: any) => {
        let newPosts = posts;
        newPosts[id].done = !newPosts[id].done;
        setPosts(newPosts);
        setFilteredPosts(newPosts);

        calculateTotals();
        updateUserPosts(cookies.get('user'), newPosts);
    }

    return (
        <main>
            <div className='flex flex-col'>    
                {/* profile */}
                <div className='flex justify-center m-2'>
                    <div className="flex bg-transparent hover:cursor-pointer transition-all hover:bg-lime-800 border border-1 border-lime-500 text-zinc-200 w-auto h-auto p-2 rounded-3xl text-center">
                        Welcome back,<span className='text-lime-300 ml-1'>{cookies.get('user')}</span>
                    </div>
                </div>

                {/* stats */}
                <div className="flex justify-center space-x-2 text-stone-300">
                    <div className="bg-transparent border border-1 border-stone-400 p-4 rounded-xl">
                        <h2 className="font-black text-lg">Total tasks</h2>
                        <p className='font-bold text-lime-300'>{generalData.totalTasks}</p>
                    </div>
                    <div className="bg-transparent border border-1 border-stone-400 p-4 rounded-xl">
                        <h2 className="font-black text-lg">Completed Tasks</h2>
                        <p className='font-bold text-lime-300'>{generalData.doneTasks}</p>
                    </div>
                    {/* <div className="bg-transparent border border-1 border-stone-400 p-4 rounded-xl">
                        <h2 className="font-black text-lg">Progress</h2>
                        <p className='font-bold text-lime-300'>148</p>
                    </div> */}
                </div>

                {/* posts */}
                <div className='flex flex-col justify-center items-center'>
                    <div className='w-[50%] p-6'>
                        <input onChange={(e) => {handleSearch(e.target.value);}} type="text" placeholder="Search tasks" className="w-full h-12 rounded-xl p-4 bg-transparent border border-1 border-stone-400 text-stone-300"/>
                        <div className='text-stone-300 font- border border-b-1 border-t-0 border-l-0 border-r-0 mt-4 mb-4'>
                            <div className='flex flex-row justify-between p-2'>
                                <span>To-do <span className='text-stone-500'>({generalData.totalTasks} items)</span></span>
                                <span>Due</span>
                            </div>
                        </div>

                        <div className='flex flex-col space-y-3 text-sm justify-between w-[100%]'>
                            {filteredPosts && Object.keys(filteredPosts).map((key: any) => {
                                return (
                                    <div key={key} className="flex flex-col text-stone-300 w-[100%]">
                                        <label className="flex items-center space-x-2">
                                            <input type="checkbox" className="hidden peer" 
                                                onChange={() => handleDone(key)}
                                                checked={filteredPosts[key].done}
                                            />
                                            <div className="w-4 h-4 bg-transparent border-2 border-white rounded-xl peer-checked:bg-lime-600 peer-checked:border-lime-600"></div>
                                            
                                            <div className='justify-between flex w-[100%]'>
                                                <span className='text-stone-300'>{filteredPosts[key].title}</span>
                                                <span className='text-stone-400'>{filteredPosts[key].deadline}</span>
                                            </div>
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}