import './Tracker.css'
import * as React from 'react';
import { Box, IconButton, InputAdornment, FormControl, OutlinedInput } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

import setTrackerName from '../../redux/trackerReducer'
import {connect} from "react-redux";

function Tracker({ sendMessage, ...props }) {
    const onChange = (e) => {
        let body = e.target.value
        console.log(body)
        sendMessage(body)
    }

    return (
        <Box sx={{ width: 500, maxWidth: '100%' }}> 
            <FormControl sx={{ width: '100%' }} variant="outlined">
            <OutlinedInput
                sx={{ borderRadius: '50px', paddingRight: '10px' }}
                id="outlined-adornment-weight"
                value={props.trackerName}
                onChange={onChange}
                // aria-describedby="outlined-weight-helper-text"
                placeholder='Enter tracker name'
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        color="success"
                        sx={{ width: "60px", height: '60px', padding: 0,}}
                        onClick={setTrackerName}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        <PlayCircleFilledIcon sx={{ width: "100%", height: '100%'}}/>
                        </IconButton>
                    </InputAdornment>
                }
            />
            </FormControl>
        </Box>
    );
}
  
const mapStateToProps = (state) => ({
    trackerName: state.trackerList.trackerName
})

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(setTrackerName(newMessageBody));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tracker);