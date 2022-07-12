import {IconButton} from "@mui/material";

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

export default IconButtons