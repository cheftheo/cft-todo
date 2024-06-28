"use server"
import { cookies } from "next/headers"

var users = []

export const loginSubmit = async(mail, password) => {
    return fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            mail: mail,
            password: password,
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        const userData = data.userData;
        users[userData.mail] = userData;
        cookies().set('user', userData.username);
        cookies().set('mail', userData.mail);
        return true;
    })
    .catch((error) => {
        console.error('Error:', error);
        return false;
    });
}

export const updateUserPosts = async(user, posts) => {
    fetch("http://localhost:3000/api/updateposts", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({
            username: user,
            posts: posts,
        }),
    })
    // .then((res) => res.json())
    // .then((data) => {
    //     // console.log("updatedData: ", JSON.stringify(data))
    //     return data;
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    //     return false;
    // });
}

export const getUserPosts = async(user) => {
    return fetch("http://localhost:3000/api/getposts", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({
            username: user,
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        cookies().set("posts", data)
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
        return false;
    });
}

export const logout = () => {
    cookies().delete('user')
}

