import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
<<<<<<< HEAD
import ItemsTrackerContainer from './ItemsTracker/ItemsTrackerContainer'
=======
import ItemsTracker from './ItemsTracker/ItemsTracker'
>>>>>>> 926724e2ac738c4f1b8373412bc5ab861caf6497

const style = {
    width: '100%',
    bgcolor: 'background.paper',
};

function TrackerList(props) {
    let listitem = props.data.trackerList.map(x =>
<<<<<<< HEAD
        <ItemsTrackerContainer key={x.id} deleteTracker={props.deleteTracker} id={x.id} buttonControl={x.buttonControl} trackName={x.trackName}
                               time={x.time} setSecondTimer={props.setSecondTimer}/>)
=======
        <ItemsTracker key={x.id} deleteTracker={props.deleteTracker} id={x.id} buttonControl={x.buttonControl} trackName={x.trackName}
              time={x.time} setSecondTimer={props.setSecondTimer}/>)
>>>>>>> 926724e2ac738c4f1b8373412bc5ab861caf6497
    return (
        <List sx={style} component="nav" aria-label="mailbox folders">
            {listitem}
        </List>
    );
}

export default TrackerList;