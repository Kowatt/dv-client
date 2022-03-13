import React, { useEffect, useState } from "react"
import decoder from "jwt-decode"
import { useNavigate } from "react-router-dom"
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'


const Navbar = () => {

    const [logged, setLogged] = useState(false)
    const [menuAnchor, setMenuAnchor] = useState(null)
    const menuOpen = Boolean(menuAnchor)
    const [profileAnchor, setProfileAnchor] = useState(null)
    const profileOpen = Boolean(profileAnchor)

    const navigate = useNavigate()

    const handleMenuClick = (event) => {
        setMenuAnchor(event.currentTarget)
    }

    const handleMenuClose = () => {
        setMenuAnchor(null)
    }

    const handleProfileClick = (event) => {
        setProfileAnchor(event.currentTarget)
    }

    const handleProfileClose = () => {
        setProfileAnchor(null)
    }

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

    function navigateToHome() {
        navigate("/")
    }

    function navigateToDashboard() {
        navigate("/dashboard")
    }

    return (
        logged ?
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: {xs: 'flex', md: 'none'} }}>
                        <IconButton color="inherit" onClick={handleMenuClick}>
                            <MenuIcon />
                        </IconButton>
                        <Menu anchorEl={menuAnchor} open={menuOpen} onClose={handleMenuClose}>
                            <MenuItem onClick={navigateToHome}>Home</MenuItem>
                            <MenuItem onClick={navigateToDashboard}>Dashboard</MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: {xs: 'none', md: 'flex'} }}>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={navigateToHome}>Home</Button>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={navigateToDashboard}>Dashboard</Button>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton sx={{ p: 0 }} onClick={handleProfileClick}>
                            <Avatar alt="Profile"/>
                        </IconButton>
                        <Menu anchorEl={profileAnchor} open={profileOpen} onClose={handleProfileClose}>
                            <MenuItem >Account</MenuItem>
                            <MenuItem onClick={disconnect}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        :
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: {xs: 'none', md: 'none'} }}>
                        <IconButton color="inherit" onClick={handleMenuClick}>
                            <MenuIcon />
                        </IconButton>
                        <Menu anchorEl={menuAnchor} open={menuOpen} onClose={handleMenuClose}>
                            <MenuItem onClick={() => {navigate("/")}}>Home</MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: {xs: 'flex', md: 'flex'} }}>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => {navigate("/")}}>Home</Button>
                    </Box>
                    <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => {navigate("/login")}}>Login</Button>
                    <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => {navigate("/register")}}>Register</Button>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar
