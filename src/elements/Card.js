import React from "react";
import { Button, Stack } from "@mui/material"
import CreditCardIcon from '@mui/icons-material/CreditCard'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const Card = (props) => {

    const card = props.card

    return (
        <Stack direction="row">
            <Button color="error" onClick={() => {props.setCurrentCard(props.cards.find(item => item._id === card._id)); props.deleteCard(true)}}><DeleteForeverIcon /></Button>
            <Button fullWidth variant="outlined" sx={{ margin: 1, justifyContent: "flex-start"}} onClick={() => {props.setCurrentCard(props.cards.find(item => item._id === card._id)); props.setShowCardForm(true)}}><CreditCardIcon />&nbsp;{card.name}</Button>
        </Stack>
    )
}

export default Card