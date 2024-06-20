// var users = []
"use server"
import { cookies } from "cookie"
import { useRouter } from "router"

class LoginHandler {
    constructor() {
        this.users = []
    }

    loginSubmit(mail, password) {
        const router = useRouter()

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
                router.push('/dashboard')
                users[data.userData.username] = data.userData
                cookies().set('user', data.userData.username)
            })
        }
        catch(err) {throw err}
    }

}