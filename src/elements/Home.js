import React from "react"
import Navbar from "./Navbar"
import Typography from '@mui/material/Typography'

function Home() {
    return (
        <div>
            <Navbar />
            <Typography component="h1" variant="h2" sx={{textAlign: "center", marginTop: "1em"}}>
                <img src="app_logo.png" width="70px" alt="logo"/>
                Welcome to DataVault
            </Typography>
            <div className="home">
                <Typography component="h1" variant="h5" sx={{textAlign: "center", marginTop: "1em"}}>
                    What is DataVault ?
                </Typography>
                <Typography variant="p" component="p" sx={{textAlign: "center"}}>
                    DataVault is a responsive web application where you can store all your data securely
                </Typography>
                <br />
                <Typography variant="p" component="p">
                    You can store :
                </Typography>
                    <ul>
                        <li>Your passwords</li>
                        <li>Your credit cards</li>
                        <li>Or even simple notes</li>
                    </ul>
                <Typography component="h1" variant="h5" sx={{textAlign: "center", marginTop: "1em"}}>
                        At what cost ?
                    </Typography>
                    <Typography variant="p" component="p" sx={{textAlign: "center"}}>
                        DataVault is completely free to use and all your data is encrypted and can't be compromised
                </Typography>
            </div>
        </div>
    )
}

export default Home