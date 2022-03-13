import React from "react"
import { useNavigate } from "react-router-dom"

const Folder = ({ name, id }) => {

    const navigate = useNavigate()

    return (
        <button className="btn btn-primary folder btn-lg" onClick={() => {navigate("folder/" + id)}}>{name}</button>
    )
}

export default Folder