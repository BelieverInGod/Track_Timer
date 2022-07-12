import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ItemsTrackerContainer from './ItemsTracker/ItemsTrackerContainer'

const style = {
    width: '100%',
    bgcolor: 'background.paper',
};

function TrackerList(props) {
    let listitem = props.data.trackerList.map(x =>
        <ItemsTrackerContainer key={x.id} deleteTracker={props.deleteTracker} id={x.id} buttonControl={x.buttonControl} trackName={x.trackName}
                               time={x.time} setSecondTimer={props.setSecondTimer}/>)
    return (
        <List sx={style} component="nav" aria-label="mailbox folders">
            {listitem}
        </List>
    );
}

export default TrackerList;