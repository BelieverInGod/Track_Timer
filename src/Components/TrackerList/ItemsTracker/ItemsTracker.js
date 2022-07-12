<<<<<<< HEAD
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {IconButton, ListItemIcon} from "@mui/material";
import IconButtons from "./IconButtons";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import './ItemsTracker.css'


const ItemsTracker = ( props ) => {
    return (
        <div >
            <Divider/>
            <ListItem  className={'itemsTracker'}>
                <ListItemText sx={{width: 290}} primary={props.trackName}/>
                <ListItemText sx={{width: 90}} primary={props.formTime}/>
                <ListItemIcon sx={{minWidth: 40}}>
                    {props.status === true ?
                        <IconButtons sx={{minWidth: 40}}  color={"info"} onClick={() => props.clickStart()}
                                     typeIcon={<PauseCircleOutlineIcon sx={{width: "100%", height: '100%', position: 'relative', right: '0'}}/>}/> :
                        <IconButtons sx={{minWidth: 40}} color={"success"} onClick={() => props.clickStop()}
                                     typeIcon={<PlayCircleOutlineIcon sx={{width: "100%", height: '100%'}}/>}/>
                    }
                </ListItemIcon>
                <ListItemIcon sx={{minWidth: 40}}>
                    <IconButton
                        color="error"
                        sx={{width: "40px", height: '40px', padding: 0,}}
                        onClick={() => props.deleteTracker()}
=======
import { useState, useEffect } from 'react';
import {IconButton, ListItemIcon} from "@mui/material";
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import correctTime from './corectTime';
import IconButtons from './IconButtons';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';


const ItemsTracker = (props) => {
    const localData = JSON.parse(localStorage.getItem(props.id));
    const curruntTime = localData.buttonControl ?
                        (Date.now() - localData.timeStart) / 1000 + localData.time  :
                        localData.time;                       
    const [time, setTime] = useState(parseInt(parseInt(curruntTime)))
    const [status, setStatus] = useState(localData.buttonControl)
    let sec;

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

    let formTime = correctTime(time)

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
                            typeIcon={<PauseCircleOutlineIcon sx={{width: "100%", height: '100%', position: 'relative', right: '0'}}/>}/> :
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
>>>>>>> 926724e2ac738c4f1b8373412bc5ab861caf6497
                        edge="end"
                    ><HighlightOffIcon sx={{width: "100%", height: '100%'}}/></IconButton>
                </ListItemIcon>
            </ListItem>
            <Divider/>
        </div>
    )
}

export default ItemsTracker