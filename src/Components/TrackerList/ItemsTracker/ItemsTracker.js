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
                        edge="end"
                    ><HighlightOffIcon sx={{width: "100%", height: '100%'}}/></IconButton>
                </ListItemIcon>
            </ListItem>
            <Divider/>
        </div>
    )
}

export default ItemsTracker