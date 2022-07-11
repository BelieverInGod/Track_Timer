import './Tracker.css'
import { useEffect } from 'react';
import * as React from 'react';
import {Box, IconButton, InputAdornment, FormControl, OutlinedInput} from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import {connect} from "react-redux";
import {deleteTrackerName, saveTracker, setSecondTimer, setTrackerName, setLocalData} from "../../redux/trackerReducer";
import TrackerList from "../TrackerList/TrackerList";
import moment from "moment";

function Tracker(props) {

    const time = moment().format('LTS');
    const onChange = (e) => {
        let body = e.target.value
        console.log(body)
        props.sendMessage(body)
    }
    const onSubmit = () => {
        const arrLenght = props.trackerList.trackerList.length
        const id = arrLenght === 0 ? 0 : props.trackerList.trackerList[arrLenght -1].id
        
        props.saveTrackName(props.newTrackName, time, id + 1)
    }
    const onDeleteTracker = (id) => {
        
        props.deleteTracker(id)
    }

    console.log(props.trackerList)

    useEffect(() => {
        // const items = {...localStorage}
        // Object.entries(items).forEach(item => {
        //    setLocalData(item[1])
        //    console.log(setLocalData(item[1]))
        // })
        const items = Object.keys(localStorage).reduce((obj, k) => {
            return { ...obj, [k]: JSON.parse(localStorage.getItem(k))}}, {});
        console.log(items)
        setLocalData({items})
    }, [])

    return (<div>
            <Box sx={{width: 500, maxWidth: '100%'}}>
                <FormControl sx={{width: '100%'}} variant="outlined">
                    <OutlinedInput
                        sx={{borderRadius: '50px', paddingRight: '10px'}}
                        id="outlined-adornment-weight"
                        value={props.newTrackName}
                        onChange={onChange}
                        placeholder='Enter tracker name'
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    color="success"
                                    sx={{width: "60px", height: '60px', padding: 0,}}
                                    onClick={onSubmit}
                                    edge="end"
                                >
                                    <PlayCircleFilledIcon sx={{width: "100%", height: '100%'}}/>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Box>
            <TrackerList deleteTracker={onDeleteTracker} data={props.trackerList} setSecondTimer={props.setSecondTimer}/>
        </div>
    )
}

    const mapStateToProps = (state) => ({
    trackerList: state.trackerList,
    newTrackName: state.trackerList.newTrackName
})

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(setTrackerName(newMessageBody));
        },
        saveTrackName: (data, time, id) => {
            dispatch(saveTracker(data, time, id))
            localStorage.setItem(id, JSON.stringify({ id: id, trackName: data, time: 0, buttonControl: true}))
        },
        deleteTracker: (id) => {
            dispatch(deleteTrackerName(id))
            localStorage.removeItem(id)
        },
        setSecondTimer: (sec, id, data) => {
            dispatch(setSecondTimer(sec, id))
            localStorage.setItem(id, JSON.stringify({ id: id, trackName: data, time: sec, buttonControl: true}))
        },
        setLocalData: (locData) => {
            dispatch(setLocalData(locData))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracker);