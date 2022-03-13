import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import decoder from "jwt-decode"

const FolderPage = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [folder, setFolder] = useState([])

    useEffect(() => {

        (async function retreiveFolder() {


            const token = localStorage.getItem('token')
            if (token) {
                const user = decoder(token)
                if (!user) {
                    localStorage.removeItem('token')
                    navigate('/login')
                }
            } else {
                navigate('/login')
            }

            const req = await fetch('http://localhost:4000/api/get/folder', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token'),
                    'x-folder-id': params.key
                }
            })
            const data = await req.json()
            if (data) {
                if (data.owner === decoder(token).username) {
                        setFolder(data)
                } else {
                    navigate("/dashboard")
                }
            } else {
                navigate("/dashboard")
            }
        })()

    })

    return (
        <div>
            <Navbar />
            <h1>Folder {folder.name}</h1>
        </div>
    )
}

export default FolderPage