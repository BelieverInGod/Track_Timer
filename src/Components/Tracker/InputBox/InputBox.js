import {Box, FormControl, IconButton, InputAdornment, OutlinedInput} from "@mui/material";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import * as React from "react";


const InputBox = (props) => {
    return (
        <Box sx={{width: 500, maxWidth: '100%'}}>
            <FormControl sx={{width: '100%'}} variant="outlined">
                <OutlinedInput
                    sx={{borderRadius: '50px', paddingRight: '10px'}}
                    id="outlined-adornment-weight"
                    value={props.newTrackName}
                    onChange={props.onChange}
                    onKeyPress={(e) => props.handleKeyPress(e)}
                    placeholder='Enter tracker name'
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                color="success"
                                sx={{width: "60px", height: '60px', padding: 0,}}
                                onClick={props.onSubmit}
                                edge="end"
                            >
                                <PlayCircleFilledIcon sx={{width: "100%", height: '100%'}}/>
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Box>
    )
}

export default InputBox
