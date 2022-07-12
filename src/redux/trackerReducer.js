const CHANGE_TRACKER_NAME = 'CHANGE_TRACKER_NAME'
const SET_TRACKER_NAME = 'SET_TRACKER_NAME'
const DELETE_TRACKER_NAME = 'DELETE_TRACKER_NAME'
const SET_SEC_TIMER = 'SET_SEC_TIMER'
const SET_LOCAL_DATA = 'SET_LOCAL_DATA'



const initialState = {
    trackerList: [],
    newTrackName: '',
}

const trackerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_TRACKER_NAME:
            return {
                ...state,
                newTrackName: action.body
            }
        case SET_TRACKER_NAME:
            return {
                ...state,
                trackerList: [...state.trackerList, {id: action.id, trackName: action.data, time: action.time, timeStart: action.timeStart}],
                newTrackName: ''
            }
        case DELETE_TRACKER_NAME:
            return {
                ...state,
                trackerList: state.trackerList.filter((item) => item.id !== action.id),
            }
        case SET_SEC_TIMER:
            return {
                ...state,
                trackerList: state.trackerList.map(sec => {
                    if (sec.id === action.id) {
                        return {...sec, time: action.sec}
                    }
                    return sec
                }),
            }
        case SET_LOCAL_DATA:
            return {
                ...state,
                trackerList: [...state.trackerList, ...action.locData],
            }    
            
        default:
            return state;
    }
}

export const setTrackerName = (body) => ({type: CHANGE_TRACKER_NAME, body})
export const saveTracker = (data, time, id, timeStart) => ({type: SET_TRACKER_NAME, data, time, id, timeStart})
export const deleteTrackerName = (id) => ({type: DELETE_TRACKER_NAME, id})
export const setSecondTimer = (sec, id) => ({type: SET_SEC_TIMER, sec, id})
export const setLocalData = (locData) => ({type: SET_LOCAL_DATA, locData})



export default trackerReducer
