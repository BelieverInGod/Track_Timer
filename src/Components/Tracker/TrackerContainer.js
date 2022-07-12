import { useEffect } from 'react';
import * as React from 'react';
import {connect} from "react-redux";
import {deleteTrackerName, saveTracker, setSecondTimer, setTrackerName, setLocalData} from "../../redux/trackerReducer";
import TrackerList from "../TrackerList/TrackerList";
import moment from 'moment';
import InputBox from "./InputBox/InputBox";

function TrackerContainer(props) {
    const momentName = moment().format('llll');

    const onChange = (e) => {
        let body = e.target.value
        props.sendMessage(body)
    }

    function handleKeyPress(e) {
        if (e.key === "Enter") onSubmit()
    }

    const onSubmit = () => {
        if (props.newTrackName.length < 30){
            const arrLenght = props.trackerList.trackerList.length
            const id = arrLenght === 0 ? 0 : props.trackerList.trackerList[arrLenght -1].id
            props.saveTrackName(props.newTrackName || momentName, 0 , id + 1, true, Date.now())

        } else if (props.newTrackName.length > 30){
            console.log('MNOGO')
        }

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
            <InputBox newTrackName={props.newTrackName} onChange={onChange} handleKeyPress={handleKeyPress} onSubmit={onSubmit}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(TrackerContainer);