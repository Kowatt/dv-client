import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

function Register() {

    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) )
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    async function registerUser(event) {
        event.preventDefault()
        const response = await fetch('http://localhost:4000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        const data = await response.json()

        if (data.status === 'ok') {
            setOpen(true)
            await timeout(2000)
            navigate('/login')
        } else {
            // TODO : failure popup
        }
    }

    return (
    <div>
        <ThemeProvider theme={createTheme()}>
            <Navbar />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Successfully registered, redirecting...
                </Alert>
            </Snackbar>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={registerUser}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoFocus
                    onChange={(e) => {setUsername(e.target.value.trim())}}
                    value={username}
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => {setPassword(e.target.value.trim())}}
                    value={password}
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    REgister
                    </Button>
                    <Link href="/login" variant="body2">
                    {"Already have an account? Login"}
                    </Link>
                </Box>
                </Box>
            </Container>
        </ThemeProvider>
    </div>
    )
}


export default Register