import './Tracker.css'
import { useEffect } from 'react';
import * as React from 'react';
import {Box, IconButton, InputAdornment, FormControl, OutlinedInput} from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import {connect} from "react-redux";
import {deleteTrackerName, saveTracker, setSecondTimer, setTrackerName, setLocalData} from "../../redux/trackerReducer";
import TrackerList from "../TrackerList/TrackerList";
import moment from 'moment';

function Tracker(props) {

    const momentName = moment().format('lll');

    console.log(momentName)

    const onChange = (e) => {
        let body = e.target.value
        props.sendMessage(body)
    }

    const onSubmit = () => {
        const arrLenght = props.trackerList.trackerList.length
        const id = arrLenght === 0 ? 0 : props.trackerList.trackerList[arrLenght -1].id
        props.saveTrackName(props.newTrackName || momentName, 0 , id + 1, true, Date.now())
    }
    const onDeleteTracker = (id) => {

        props.deleteTracker(id)
    }

    useEffect(() => {
        if(props) {
            const items = Object.keys(localStorage).reduce((acc, k) => {
                acc.push(JSON.parse(localStorage.getItem(k)))
                return acc
            }, []);
            props.setLocalData(items)
        }
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
            <TrackerList deleteTracker={onDeleteTracker} data={props.trackerList} setSecondTimer={props.setSecondTimer} setLocalData={props.setLocalData}/>
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
        saveTrackName: (data, time, id, buttonControl, timeStart) => {
            dispatch(saveTracker(data, time, id, true))
            localStorage.setItem(id, JSON.stringify({ id: id, trackName: data, time: 0, buttonControl: buttonControl,
                 timeStart: timeStart}))
        },
        deleteTracker: (id) => {
            dispatch(deleteTrackerName(id))
            localStorage.removeItem(id)
        },
        setSecondTimer: (sec, id, data, buttonControl, timeStart, timeEnd ) => {
            dispatch(setSecondTimer(sec, id, buttonControl))
            localStorage.setItem(id, JSON.stringify({ id: id, trackName: data, time: sec, buttonControl: buttonControl,
             timeStart: timeStart}))
        },
        setLocalData: (locData) => {
            dispatch(setLocalData(locData))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracker);