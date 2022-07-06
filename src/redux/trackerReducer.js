const SET_TRACKER_NAME = 'SET_TRACKER_NAME'

const initialState = {
    trackerName: '',
    time: null,
    buttonControl: false,
    buttonRemuve: false
}

const trackerReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_TRACKER_NAME:
            return {
                ...state,
                trackerName: action.body
            }
        default:
            return state;
    }
}

export const setTrackerName = (body) => ({type: SET_TRACKER_NAME, body})

export default trackerReducer