import React, { useEffect, useState } from "react"
import decoder from "jwt-decode"
import { NavLink, useNavigate } from "react-router-dom"

const Menu = () => {

    const [logged, setLogged] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        function logCheck() {
            const token = localStorage.getItem('token')
            if (token) {
                const user = decoder(token)
                if (!user) {
                    setLogged(false)
                } else {
                    setLogged(true)
                }
            } else {
                setLogged(false)
            }
        }

        logCheck()
    })

    function disconnect() {
        setLogged(false)
        localStorage.clear()
        navigate("/login")
    }

    return (
        logged ?
            <div>
                <nav>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><button onClick={disconnect} className="btn btn-danger logout">Logout</button></li>
                        <li><NavLink to="/profile">Profile</NavLink></li>
                        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    </ul>
                </nav>
            </div>
        :
        <div>
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/register">Register</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}

export default Menu