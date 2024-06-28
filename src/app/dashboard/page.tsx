"use client"

import { useCookies } from 'next-client-cookies';
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import { getUserPosts, updateUserPosts } from '../../lib/auth';

export default function Dashboard() {
    const cookies = useCookies()
    const router = useRouter()

    if (cookies.get('user') === undefined) router.push('/signin');

    const [posts, setPosts] = useState<any[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
    const [generalData, setGeneralData] = useState<{ totalTasks: number, doneTasks: number }>({ totalTasks: 0, doneTasks: 0 });

    const [isPromptOpen, setIsPromptOpen] = useState(false);
    const [hoveredKey, setHoveredKey] = useState<string | null>(null);

    const handleMouseEnter = (key: string) => {
        setHoveredKey(key);
    };

    const handleMouseLeave = () => {
        setHoveredKey(null);
    };

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

    const handleDelete = (id: any) => {
        let newPosts = posts;
        delete newPosts[id];

        setPosts(newPosts);
        setFilteredPosts(newPosts);

        calculateTotals();
        updateUserPosts(cookies.get('user'), newPosts);
    }

    const handleCreate = () => {
        const title = (document.querySelector('input[type="text"]') as HTMLInputElement).value;
        const description = (document.querySelector('input[type="text"]') as HTMLInputElement).value;
        const deadline = (document.querySelector('input[type="date"]') as HTMLInputElement).value;
        
        let newPosts = posts;
        // newPosts.push({ title: title, description: description, deadline: deadline, done: false });
        // add to array without push
        console.log(title, description, deadline)
        newPosts[generalData.totalTasks + 1] = { title: title, desc: description, deadline: deadline, done: false };

        console.log(newPosts)

        setPosts(newPosts);
        setFilteredPosts(newPosts);

        calculateTotals();
        updateUserPosts(cookies.get('user'), newPosts);
        setIsPromptOpen(false);
    }

    return (
        <main>
            {isPromptOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-zinc-700 border border-1 border-stone-400 p-6 rounded-xl'>
                        <div className='flex flex-col gap-y-4'>
                            <input type="text" placeholder="Task title" className="w-full h-12 rounded-xl p-2 bg-transparent border border-1 border-stone-400 text-stone-300"/>
                            <input type="text" placeholder="Task description" className="w-full h-12 rounded-xl p-2 bg-transparent border border-1 border-stone-400 text-stone-300"/>
                            <input type="date" placeholder="Task deadline" className="w-full h-12 rounded-xl p-2 bg-transparent border border-1 border-stone-400 text-stone-300"/>
                            <button onClick={() => handleCreate()} className='bg-transparent p-2 border border-1 border-stone-400 rounded-xl text-stone-400'>Create</button>
                        </div>
                    </div>
                </div>
            )}

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
                </div>

                {/* posts */}
                <div className='flex flex-col justify-center items-center'>
                    <div className='w-[50%] p-6'>
                        
                        <div className='flex flex-row gap-x-4'>
                            <input onChange={(e) => {handleSearch(e.target.value);}} type="text" placeholder="Search tasks" className="w-full h-12 rounded-xl p-2 bg-transparent border border-1 border-stone-400 text-stone-300"/>
                            <button onClick={() => setIsPromptOpen(true)} className='bg-transparent p-2 border border-1 border-stone-400 rounded-xl text-stone-400'><FontAwesomeIcon icon={faPlus} /></button>
                        </div>

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
                                                <span className='text-stone-300 flex flex-row gap-x-2'>
                                                    <div 
                                                        key={key}
                                                        onMouseEnter={() => handleMouseEnter(key)}
                                                        onMouseLeave={handleMouseLeave}
                                                    >
                                                        {hoveredKey === key ? filteredPosts[key].desc : filteredPosts[key].title}
                                                    </div>
                                                    <button className='transition-all hover:text-red-500 text-stone-500' onClick={() => handleDelete(key)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </span>
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