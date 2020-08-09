export const SETPROFILEPOSTS = 'SETPROFILEPOSTS'
export const SETMOREPROFILEPOSTS = 'SETMOREPROFILEPOSTS'
export const SETPROFILEPAGE = 'SETPROFILEPAGE'
export const LIKEPROFILEPOST = 'LIKEPROFILEPOST'
export const SETPROFILE = 'SETPROFILE'

export const setProfilePosts = posts => {
    return {
        type: SETPROFILEPOSTS,
        posts
    }
}

export const setMoreProfilePosts = posts => {
    return {
        type: SETMOREPROFILEPOSTS,
        posts
    }
}

export const setProfilePage = page => {
    return {
        type: SETPROFILEPAGE,
        page
    }
}

export const likeProfilePost = (postId, post) => {
    return {
        type: LIKEPROFILEPOST,
        postId,
        post
    }
}

export const setProfile = (profile) => {
    return {
        type: SETPROFILE,
        profile
    }
}
