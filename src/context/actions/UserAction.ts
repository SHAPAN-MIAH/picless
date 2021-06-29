
export const showUserAbout = (payload: any) => {
    return(dispatch: any, getState: any) => {
        fetch('')
        .then
        
    }
    return{ 
        type: 'SHOW_USER_ABOUT',
        payload: payload,
    }
} 
export const showUserPhotos = (payload: any) => {
    return{ 
        type: 'SHOW_USER_PHOTOS',
        payload: payload,
    }
} 
export const showUserVideos = (payload: any) => {
    return{ 
        type: 'SHOW_USER_VIDEOS',
        payload: payload,
    }
} 
