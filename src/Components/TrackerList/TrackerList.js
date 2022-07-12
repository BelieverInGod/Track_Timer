import * as React from 'react';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {IconButton, ListItemIcon} from "@mui/material";
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const style = {
    width: '100%',
    bgcolor: 'background.paper',
};

const IconButtons = (props) => {
    return (
        <IconButton
            color={props.color}
            sx={{width: "40px", height: '40px', padding: 0,}}
            onClick={props.onClick}
            edge="end"
        >
            {props.typeIcon}
        </IconButton>
    )
}

const Post = (props) => {
    const localData = JSON.parse(localStorage.getItem(props.id));
    console.log(localData)
    const curruntTime = localData.buttonControl ?
                        (Date.now() - localData.timeStart) / 1000 + localData.time  :
                        localData.time               
                        
    const [time, setTime] = useState(parseInt(parseInt(curruntTime)))
    const [status, setStatus] = useState(localData.buttonControl)
    let sec;

    console.log(Date.now() - localData.timeStart )

    useEffect(() => {
        if (status === true) {
            sec = setInterval(() => {
                setTime((s) => s + 1);
            }, 1000);
        } else if (status === false) {
            clearInterval(sec)
        }
        return () => clearInterval(sec);
    }, [status])

    function correct_time(sec) {
        let h = sec / 3600 ^ 0;
        let m = (sec - h * 3600) / 60 ^ 0;
        let s = sec - h * 3600 - m * 60
        let formatted = [
            h.toString().padStart(2, '0'),
            m.toString().padStart(2, '0'),
            s.toString().padStart(2, '0')
        ].join(':');
        return formatted
    }

    let formTime = correct_time(time)

    return (
        <div>
            <Divider/>
            <ListItem button>
                <ListItemText primary={props.trackName}/>
                <ListItemText primary={formTime}/>
                <ListItemIcon>
                    {status === true ?
                        <IconButtons color={"info"} onClick={() => {
                            setStatus(false)
                            return props.setSecondTimer(time, props.id, props.trackName, false , localData.timeStart)
                        }}
                            typeIcon={<PauseCircleOutlineIcon sx={{width: "100%", height: '100%'}}/>}/> :
                        <IconButtons color={"success"} onClick={() => {
                            setStatus(true)
                            return props.setSecondTimer(time, props.id, props.trackName, true, Date.now())
                            }
                        }
                                     typeIcon={<PlayCircleOutlineIcon sx={{width: "100%", height: '100%'}}/>}/>
                    }
                </ListItemIcon>
                <ListItemIcon>
                    <IconButton
                        color="error"
                        sx={{width: "40px", height: '40px', padding: 0,}}
                        onClick={() => props.deleteTracker(props.id)}
                        edge="end"
                    ><HighlightOffIcon sx={{width: "100%", height: '100%'}}/></IconButton>
                </ListItemIcon>
            </ListItem>
            <Divider/>
        </div>
    )
}

function TrackerList(props) {
    let listitem = props.data.trackerList.map(x =>
        <Post key={x.id} deleteTracker={props.deleteTracker} id={x.id} buttonControl={x.buttonControl} trackName={x.trackName}
              time={x.time} setSecondTimer={props.setSecondTimer}/>)
    return (
        <List sx={style} component="nav" aria-label="mailbox folders">
            {listitem}
            <Divider/>
        </List>
    );
}

export default TrackerList;