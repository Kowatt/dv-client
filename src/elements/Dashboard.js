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
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CachedIcon from '@mui/icons-material/Cached';

const Dashboard = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [folders, setFolders] = useState([])
    const [stateButton, setStateButton] = useState(false)
    const [deletePopupState, setDeletePopupState] = useState(false)
    const [folderName, setFolderName] = useState("")

    const [cardFormState, setCardFormState] = useState(false)
    const [passFormState, setPassFormState] = useState(false)
    const [noteFormState, setNoteFormState] = useState(false)

    const [cards, setCards] = useState([])
    const [pass, setPass] = useState([])
    const [notes, setNotes] = useState([])

    const [showCardForm, setShowCardForm] = useState(false)
    const [showPassForm, setShowPassForm] = useState(false)
    const [showNoteForm, setShowNoteForm] = useState(false)

    const emptyCard = {
        _id: 0,
        name: "-",
        number: "-",
        date: "-",
        ccv: "-",
        owner: "-",
        folder: "-"
    }

    const emptyPass = {
        _id: 0,
        name: "-",
        url: "-",
        user: "-",
        pass: "-",
        owner: "-",
        folder: "-"
    }

    const emptyNote = {
        _id: 0,
        name: "-",
        title: "-",
        note: "-",
        owner: "-",
        folder: "-"
    }

    const [currentCard, setCurrentCard] = useState(emptyCard)
    const [currentPass, setCurrentPass] = useState(emptyPass)
    const [currentNote, setCurrentNote] = useState(emptyNote)

    const [passwordValue, setPasswordValue] = useState("")

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

    async function retreiveCards() {
        const req = await fetch('http://localhost:4000/api/get/data/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                folder: currentFolder.id
            })
        })

        return await req.json()
    }

    async function retreivePass() {
        const req = await fetch('http://localhost:4000/api/get/data/pass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                folder: currentFolder.id
            })
        })

        return await req.json()
    }

    async function retreiveNotes() {
        const req = await fetch('http://localhost:4000/api/get/data/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                folder: currentFolder.id
            })
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
            setCards([])
            setPass([])
            setNotes([])
        }
    }

    function updateFolders() {
        retreiveFolders().then(data => {
            setFolders(data)
        })
    }

    
    function updateData() {
        retreiveCards().then(data => {
            if (!data.error)
                setCards(data)
        })
        retreivePass().then(data => {
            if (!data.error)
                setPass(data)
        })
        retreiveNotes().then(data => {
            if (!data.error)
                setNotes(data)
        })
    }

    useEffect(() => {
        retreiveFolders().then(data => {
            setFolders(data)
        })
    }, [])

    useEffect(() => {
        if (currentFolder.id) {
            retreiveCards().then(data => {
                if (!data.error)
                    setCards(data)
            })
            retreivePass().then(data => {
                if (!data.error) 
                    setPass(data)
            })
            retreiveNotes().then(data => {
                if (!data.error)
                    setNotes(data)
            })
        }
    }, [currentFolder])

    function generatePassword() {
        var length = 12,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789;:,@!&(-_)=+.?",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }


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


    async function addCard(event) {
        event.preventDefault()

        if (currentFolder.id === null) {
            setCardFormState(false)
            return
        }

        const formData = new FormData(event.currentTarget)
        const name = formData.get("card_name")
        const number = formData.get("card_number")
        const date = formData.get("card_date")
        const ccv = formData.get("card_ccv")
        const req = await fetch('http://localhost:4000/api/add/data/card', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                name: name,
                number: number,
                date: date,
                ccv: ccv,
                folder: currentFolder.id
            })
        })

        const data = await req.json()
        if (data.status === 'ok') {
            setCardFormState(false)
            updateData()
        }
    }

    async function addPass(event) {
        event.preventDefault()

        if (currentFolder.id === null) {
            setPassFormState(false)
            return
        }

        const formData = new FormData(event.currentTarget)
        const name = formData.get("pass_name")
        const url = formData.get("pass_url")
        const user = formData.get("pass_user")
        const pass = passwordValue
        const req = await fetch('http://localhost:4000/api/add/data/pass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                name: name,
                url: url,
                user: user,
                pass: pass,
                folder: currentFolder.id
            })
        })

        const data = await req.json()
        if (data.status === 'ok') {
            setPasswordValue("")
            setPassFormState(false)
            updateData()
        }
    }

    async function addNote(event) {
        event.preventDefault()

        if (currentFolder.id === null) {
            setNoteFormState(false)
            return
        }

        const formData = new FormData(event.currentTarget)
        const name = formData.get("note_name")
        const title = formData.get("note_title")
        const note = formData.get("note")
        const req = await fetch('http://localhost:4000/api/add/data/note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                name: name,
                title: title,
                note: note,
                folder: currentFolder.id
            })
        })

        const data = await req.json()
        if (data.status === 'ok') {
            setNoteFormState(false)
            updateData()
        }
    }

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

    const cardsList = cards.map (
        (card) => (<Button key={card._id} variant="outlined" sx={{ margin: 1, justifyContent: "flex-start"}} onClick={() => {setCurrentCard(cards.find(item => item._id === card._id)); setShowCardForm(true)}}><CreditCardIcon />&nbsp;{card.name}</Button>)
    )

    const passList = pass.map (
        (passI) => (<Button key={passI._id} variant="outlined" sx={{ margin: 1, justifyContent: "flex-start"}} onClick={() => {setCurrentPass(pass.find(item => item._id === passI._id)); setShowPassForm(true)}}><VpnKeyIcon />&nbsp;{passI.name}</Button>)
    )

    const notesList = notes.map (
        (note) => (<Button key={note._id} variant="outlined" sx={{ margin: 1, justifyContent: "flex-start"}} onClick={() => {setCurrentNote(notes.find(item => item._id === note._id)); setShowNoteForm(true)}}><TextSnippetIcon />&nbsp;{note.name}</Button>)
    )

    function RenderActionBar(props) {
        const shouldRender = props.shouldRender

        if (shouldRender) {
            return (
                <Stack direction="column" spacing={1} className="folders-controls">
                    <Button variant="contained" color="error" size="small" fullWidth onClick={() => {if (currentFolder.id) setDeletePopupState(true)}}><DeleteForeverIcon /></Button>
                    <Button variant="contained" size="small" fullWidth onClick={() => {setCardFormState(true)}}>+&nbsp;<CreditCardIcon /></Button>
                    <Button variant="contained" size="small" fullWidth onClick={() => {setPassFormState(true)}}>+&nbsp;<VpnKeyIcon /></Button>
                    <Button variant="contained" size="small" fullWidth onClick={() => {setNoteFormState(true)}}>+&nbsp;<TextSnippetIcon /></Button>
                </Stack>
            )
        }
        return <div></div>
    }

    function handleLink() {
        if (!currentPass.url.startsWith("http://")) {
            window.open("http://" + currentPass.url)
        } else {
            window.open(currentPass.url)
        }
    }

    function handleGeneratePass() {
        setPasswordValue(generatePassword())
    }

    return (
        <div>
            <Navbar />
            <div className="dashboard">
                <Typography component="h4" variant="h4">
                    {username}'s dashboard
                </Typography>
                <Stack direction="row" spacing={1} className="stack">
                    <Stack direction="column" spacing={1} className="folders-panel">
                        <Stack direction="column" spacing={1} className="folders">
                            {renderedList}
                        </Stack>
                        <Button onClick={() => {setStateButton(true)}} variant="outlined" className="add-button" size="large" fullWidth><AddIcon /></Button>
                    </Stack>
                    <div className="info-panel">
                        <Typography component="h4" variant="h4" sx={{textAlign: "center"}}>
                            {currentFolder.title}
                        </Typography>
                        <Stack direction="column">
                            {cardsList}
                            {passList}
                            {notesList}
                        </Stack>
                        <RenderActionBar shouldRender={currentFolder.id} />
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

                <FormPopup trigger={cardFormState} setTrigger={setCardFormState}>
                    <Typography component="h2" variant="h5">
                        Add Credit card
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={addCard}>
                        <TextField margin="normal" required fullWidth id="card_name" label="Data Name" name="card_name" autoFocus/>
                        <TextField margin="normal" required fullWidth id="card_number" label="Card number" name="card_number"/>
                        <TextField margin="normal" required fullWidth id="card_date" label="Card date" name="card_date"/>
                        <TextField margin="normal" required fullWidth id="card_ccv" label="Card CCV" name="card_ccv"/>
                        <Stack direction="row" spacing={1} style={{flex : 0}}>
                            <Button variant="contained" color="success" fullWidth type="submit">Add</Button>
                            <Button onClick={() => {setCardFormState(false)}} variant="contained" color="error" fullWidth>Cancel</Button> 
                        </Stack>
                    </Box>
                </FormPopup>

                <FormPopup trigger={passFormState} setTrigger={setPassFormState}>
                    <Typography component="h2" variant="h5">
                        Add Password
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={addPass}>
                        <TextField margin="normal" required fullWidth id="pass_name" label="Data Name" name="pass_name" autoFocus/>
                        <TextField margin="normal" required fullWidth id="pass_url" label="Website URL" name="pass_url"/>
                        <TextField margin="normal" required fullWidth id="pass_user" label="Username" name="pass_user"/>
                        <Stack direction="row">
                            <TextField sx={{marginBottom: "1em"}} required fullWidth label="Password" value={passwordValue} onChange={(e) => {setPasswordValue(e.target.value)}}/>
                            <Button variant="contained" sx={{marginLeft: "1em", marginBottom: "1em"}} onClick={handleGeneratePass}><CachedIcon /></Button>
                        </Stack>
                        <Stack direction="row" spacing={1} style={{flex : 0}}>
                            <Button variant="contained" color="success" fullWidth type="submit">Add</Button>
                            <Button onClick={() => {setPassFormState(false); setPasswordValue("")}} variant="contained" color="error" fullWidth>Cancel</Button> 
                        </Stack>
                    </Box>
                </FormPopup>

                <FormPopup trigger={noteFormState} setTrigger={setNoteFormState}>
                    <Typography component="h2" variant="h5">
                        Add Note
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={addNote}>
                        <TextField margin="normal" required fullWidth id="note_name" label="Data Name" name="note_name" autoFocus/>
                        <TextField margin="normal" required fullWidth id="note_title" label="Note title" name="note_title"/>
                        <TextField margin="normal" required fullWidth multiline id="note" label="Note" name="note"/>
                        <Stack direction="row" spacing={1} style={{flex : 0}}>
                            <Button variant="contained" color="success" fullWidth type="submit">Add</Button>
                            <Button onClick={() => {setNoteFormState(false)}} variant="contained" color="error" fullWidth>Cancel</Button> 
                        </Stack>
                    </Box>
                </FormPopup>

                <FormPopup trigger={showCardForm} setTrigger={setShowCardForm}>
                    <TextField margin="normal" label="Data name" InputProps={{readOnly: true}} fullWidth value={currentCard.name}/>
                    <TextField margin="normal" label="Card number" InputProps={{readOnly: true}} fullWidth value={currentCard.number}/>
                    <TextField margin="normal" label="Card date" InputProps={{readOnly: true}} fullWidth value={currentCard.date}/>
                    <TextField margin="normal" label="Card CCV" InputProps={{readOnly: true}} fullWidth value={currentCard.ccv}/>
                    <Button onClick={() => {setShowCardForm(false)}} variant="contained" color="error">Close</Button>
                </FormPopup>
                <FormPopup trigger={showPassForm} setTrigger={setShowPassForm}>
                    <TextField margin="normal" label="Data name" InputProps={{readOnly: true}} fullWidth value={currentPass.name}/>
                    <Stack direction="row">
                        <TextField sx={{margin: 0}} label="Website" InputProps={{readOnly: true}} fullWidth value={currentPass.url}/>
                        <Button variant="contained" sx={{marginLeft: "1em"}} onClick={handleLink}><ArrowCircleRightIcon /></Button>
                    </Stack>
                    <TextField margin="normal" label="Username" InputProps={{readOnly: true}} fullWidth value={currentPass.user}/>
                    <TextField margin="normal" label="Password" InputProps={{readOnly: true}} fullWidth value={currentPass.pass}/>
                    <Button onClick={() => {setShowPassForm(false)}} variant="contained" color="error">Close</Button>
                </FormPopup>
                <FormPopup trigger={showNoteForm} setTrigger={setShowNoteForm}>
                    <TextField margin="normal" label="Data name" InputProps={{readOnly: true}} fullWidth value={currentNote.name}/>
                    <TextField margin="normal" label="Title" InputProps={{readOnly: true}} fullWidth value={currentNote.title}/>
                    <TextField margin="normal" multiline label="Content" InputProps={{readOnly: true}} fullWidth value={currentNote.note}/>
                    <Button onClick={() => {setShowNoteForm(false)}} variant="contained" color="error">Close</Button>
                </FormPopup>
            </div>
        </div>
    )
}

export default Dashboard