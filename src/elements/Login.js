import React from "react"
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

function Login() {

    const navigate = useNavigate()

    const [open, setOpen] = React.useState(false)

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) )
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    async function loginUser(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const username = formData.get("username")
        const password = formData.get("password")
        const response = await fetch('https://datavault-iut.herokuapp.com/api/login', {
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

        if (data.user) {
            localStorage.setItem("token", data.user)
            setOpen(true)
            await timeout(2000)
            navigate("/dashboard")
        } else {
            alert('Please check username and password')
            // TODO : Failure popup
        }
    }

    return (
        <ThemeProvider theme={createTheme()}>
            <Navbar />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Successfully logged in, redirecting...
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
                    Login
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={loginUser}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoFocus
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
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Login
                    </Button>
                    <Link href="/register" variant="body2">
                    {"Don't have an account? Register"}
                    </Link>
                </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}


export default Login