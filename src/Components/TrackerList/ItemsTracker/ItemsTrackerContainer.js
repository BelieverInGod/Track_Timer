import {useState, useEffect} from 'react';
import correctTime from './corectTime';
import ItemsTracker from "./ItemsTracker";


const ItemsTrackerContainer = (props) => {
    let sec;
    const localData = JSON.parse(localStorage.getItem(props.id));
    const curruntTime = localData.buttonControl ?
        (Date.now() - localData.timeStart) / 1000 + localData.time :
        localData.time;
    const [time, setTime] = useState(parseInt(curruntTime))
    const [status, setStatus] = useState(localData.buttonControl)

    const clickStart = () => {
        setStatus(false)
        return props.setSecondTimer(time, props.id, props.trackName, false, localData.timeStart)
    }

    const clickStop = () => {
        setStatus(true)
        return props.setSecondTimer(time, props.id, props.trackName, true, Date.now())
    }

    const deleteTracker = () => {
        props.deleteTracker(props.id)
    }

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

    return (
        <ItemsTracker trackName={props.trackName} formTime={correctTime(time)} clickStart={clickStart}
                      clickStop={clickStop} deleteTracker={deleteTracker} status={status} />
    )
}

export default ItemsTrackerContainer