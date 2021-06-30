
const initialState = {
    about: [],
    photos: [],
    videos: []
}

const UserReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case 'SHOW_USER_ABOUT': {
            const newState = {
                ...state,
                about: action.payload
            }
            return newState
        }
        case 'SHOW_USER_PHOTOS': {
            const newState = {
                ...state,
                photos: action.payload
            }
            return newState
        }
        case 'SHOW_USER_VIDEOS': {
            const newState = {
                ...state,
                videos: action.payload
            }
            return newState
        }
        default: {
            return state
        }
    }
}

export default UserReducer;