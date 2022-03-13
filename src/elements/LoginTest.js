import React, { useEffect, useState } from "react"
import decoder from "jwt-decode"
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"

const LoginTest = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")

    useEffect(() => {
        function retreiveUsername() {
            const token = localStorage.getItem('token')
            console.log(token)
            if (token) {
                const user = decoder(token)
                if (!user) {
                    localStorage.removeItem('token')
                    navigate('/login')
                } else {
                    setUsername(user.username)
                }
            } else {
                navigate('/login')
            }
        }
        retreiveUsername()
    })

    return (
        <div>
            <Navbar />
            <h1>Test page</h1>
            <h2>Welcome {username} </h2>
        </div>
    )
}

export default LoginTest