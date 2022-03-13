import React, { useEffect, useState } from "react"
import decoder from "jwt-decode"
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import FormPopup from "./FormPopup"
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import AddIcon from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

const Dashboard = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [folders, setFolders] = useState([])
    const [stateButton, setStateButton] = useState(false)
    const [deletePopupState, setDeletePopupState] = useState(false)
    const [folderName, setFolderName] = useState("")

    const emptyFolder = {
        title: "No folder selected",
        id: null
    }

    const [currentFolder, setCurrentFolder] = useState(emptyFolder)

    async function retreiveFolders() {
        const req = await fetch('http://localhost:4000/api/get/folders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            }
        })
        
        return await req.json()
    }

    async function deleteFolder() {
        const req = await fetch('http://localhost:4000/api/remove/folder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                folderId: currentFolder.id
            })
        })

        const data = await req.json()

        if (data.status === 'ok') {
            setDeletePopupState(false)
            setCurrentFolder(emptyFolder)
            updateFolders()
        }
    }

    function updateFolders() {
        retreiveFolders().then(data => {
            setFolders(data)
        })
    }

    useEffect(() => {
        retreiveFolders().then(data => {
            setFolders(data)
        })
    }, [])

    useEffect(() => {
        (function retreiveUsername() {
            const token = localStorage.getItem('token')
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
        })()
    })

    async function addFolder(event) {
        event.preventDefault()
        const req = await fetch('http://localhost:4000/api/add/folder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                name: folderName
            })
        })

        const data = await req.json()

        if (data.status === 'ok') {
            setStateButton(false)
            setFolderName("")
            updateFolders()
        }
    }

    function handleFolderInputChange(event) {
        setFolderName(event.target.value.trim())
    }


    const renderedList = folders.map (
        (item) => (
            <Button onClick={() => {setCurrentFolder({title: item.name, id: item._id})}} variant="contained" size="large" key={item._id} fullWidth>{item.name}</Button>
        )
    )

    return (
        <div>
            <Navbar />
            <div className="dashboard">
                <h2>{username}'s dashboard</h2>
                <Stack direction="row" spacing={1} className="stack">
                    <Stack direction="column" spacing={1} className="folders-panel">
                        <Stack direction="column" spacing={1} className="folders">
                            {renderedList}
                        </Stack>
                        <Button onClick={() => {setStateButton(true)}} variant="outlined" className="add-button" size="large" fullWidth><AddIcon /></Button>
                    </Stack>
                    <div className="info-panel">
                        <h3>{currentFolder.title}</h3>
                        <Stack direction="column">

                        </Stack>
                        <Stack direction="column" spacing={1} className="folders-controls">
                            <Button variant="contained" color="error" size="small" fullWidth onClick={() => {if (currentFolder.id) setDeletePopupState(true)}}><DeleteForeverIcon /></Button>
                            <Button variant="contained" size="small" fullWidth>+&nbsp;<CreditCardIcon /></Button>
                            <Button variant="contained" size="small" fullWidth>+&nbsp;<VpnKeyIcon /></Button>
                            <Button variant="contained" size="small" fullWidth>+&nbsp;<TextSnippetIcon /></Button>
                        </Stack>
                    </div>
                </Stack>
                <FormPopup trigger={stateButton} setTrigger={setStateButton}>
                    <Typography component="h2" variant="h5">
                        Add Folder
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={addFolder}>
                        <TextField margin="normal" required fullWidth id="folderName" label="Folder name" name="folderName" onChange={handleFolderInputChange} autoFocus value={folderName} inputProps={{ maxLength: 8 }}/>
                        <Stack direction="row" spacing={1} style={{flex : 0}}>
                            <Button variant="contained" color="success" fullWidth type="submit">Add</Button>
                            <Button onClick={() => {setStateButton(false)}} variant="contained" color="error" fullWidth>Cancel</Button>
                        </Stack>
                    </Box>
                </FormPopup>
                <FormPopup trigger={deletePopupState} setTrigger={setDeletePopupState}>
                <Typography component="p" variant="p">
                        Are you sure that you want to remove that folder and all its content ?
                    </Typography>
                    <Stack direction="row" spacing={1} style={{flex : 0}}>
                        <Button variant="contained" color="success" onClick={deleteFolder} fullWidth>Delete</Button>
                        <Button onClick={() => {setDeletePopupState(false)}} variant="contained" color="error" fullWidth>Cancel</Button> 
                    </Stack>
                </FormPopup>
            </div>
        </div>
    )
}

export default Dashboard