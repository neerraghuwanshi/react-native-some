export const SETUSERPOSTS = 'SETUSERPOSTS'
export const SETMOREUSERPOSTS = 'SETMOREUSERPOSTS'
export const SETUSERPAGE = 'SETUSERPAGE'
export const LIKEUSERPOST = 'LIKEUSERPOST'
export const ADDUSERPOST = 'ADDUSERPOST'
export const DELETEUSERPOST = 'DELETEUSERPOST'
export const SETUSERPROFILE = 'SETUSERPROFILE'
export const INCREASEFOLLOWING = 'INCREASEFOLLOWING'
export const DECREASEFOLLOWING = 'DECREASEFOLLOWING'
export const INCREASEPOSTS = 'INCREASEPOSTS'
export const DECREASEPOSTS = 'DECREASEPOSTS'

export const setUserPosts = posts => {
    return {
        type: SETUSERPOSTS,
        posts
    }
}

export const setMoreUserPosts = posts => {
    return {
        type: SETMOREUSERPOSTS,
        posts
    }
}

export const setUserPage = page => {
    return {
        type: SETUSERPAGE,
        page
    }
}

export const likeUserPost = (postId, post) => {
    return {
        type: LIKEUSERPOST,
        postId,
        post
    }
}

export const addUserPost = post => {
    return {
        type: ADDUSERPOST,
        post
    }
}

export const deleteUserPost = id => {
    return {
        type: DELETEUSERPOST,
        id
    }
}

export const setUserProfile = profile => {
    return {
        type: SETUSERPROFILE,
        profile
    }
}

export const increaseFollowing = () => {
    return {
        type: INCREASEFOLLOWING,
    }
}

export const decreaseFollowing = () => {
    return {
        type: DECREASEFOLLOWING,
    }
}

export const increasePosts = () => {
    return {
        type: INCREASEPOSTS,
    }
}

export const decreasePosts = () => {
    return {
        type: DECREASEPOSTS,
    }
}