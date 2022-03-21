import React, { useEffect, useState } from "react"
import decoder from "jwt-decode"
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"

const Component = () => {

    const [username, setUsername] = useState("Default Value")

    return (
        <div>
            <Navbar />
            <h1>Test page</h1>
            <h2>Welcome {username} </h2>
            <button onClick={() => {console.log("I clicked on the button !")}}>Click</button>
            <button onClick={() => {setUsername("Username changed !")}}>Change username</button>
        </div>
    )
}

export default Component