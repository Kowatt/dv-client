import React from "react";
import { Button } from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import { Stack } from "@mui/material";

const Note = (props) => {

    const note = props.note

    return (
        <Stack direction="row">
             <Button color="error" onClick={() => {props.setCurrentNote(props.notes.find(item => item._id === note._id)); props.deleteNote(true)}}><DeleteForeverIcon /></Button>
             <Button variant="outlined" fullWidth sx={{ margin: 1, justifyContent: "flex-start"}} onClick={() => {props.setCurrentNote(props.notes.find(item => item._id === note._id)); props.setShowNoteForm(true)}}><TextSnippetIcon />&nbsp;{note.name}</Button>
        </Stack>
    )

}

export default Note