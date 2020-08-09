export const SETHOMEPOSTS = 'SETHOMEPOSTS'
export const SETMOREHOMEPOSTS = 'SETMOREHOMEPOSTS'
export const SETHOMEPAGE = 'SETHOMEPAGE'
export const LIKEHOMEPOST = 'LIKEHOMEPOST'
export const ADDHOMEPOST = 'ADDHOMEPOST'
export const DELETEHOMEPOST = 'DELETEHOMEPOST'


export const setHomePosts = posts => {
    return {
        type: SETHOMEPOSTS,
        posts
    }
}

export const setMoreHomePosts = posts => {
    return {
        type: SETMOREHOMEPOSTS,
        posts
    }
}

export const setHomePage = page => {
    return {
        type: SETHOMEPAGE,
        page
    }
}

export const likeHomePost = (postId, post) => {
    return {
        type: LIKEHOMEPOST,
        postId,
        post
    }
}

export const addHomePost = post => {
    return {
        type: ADDHOMEPOST,
        post
    }
}

export const deleteHomePost = id => {
    return {
        type: DELETEHOMEPOST,
        id
    }
}
