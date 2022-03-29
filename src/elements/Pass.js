import React from "react";
import { Button } from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import { Stack } from "@mui/material";

const Pass = (props) => {

    const passI = props.passI

    return (
        <Stack direction="row">
             <Button color="error" onClick={() => {props.setCurrentPass(props.pass.find(item => item._id === passI._id)); props.deletePass(true)}}><DeleteForeverIcon /></Button>
            <Button fullWidth variant="outlined" sx={{ margin: 1, justifyContent: "flex-start"}} onClick={() => {props.setCurrentPass(props.pass.find(item => item._id === passI._id)); props.setShowPassForm(true); props.setShowPassword(false)}}><VpnKeyIcon />&nbsp;{passI.name}</Button>
        </Stack>
    )

}


export default Pass

