import {
    SETPROFILEPOSTS,
    SETMOREPROFILEPOSTS,
    SETPROFILEPAGE,
    LIKEPROFILEPOST,
    SETPROFILE
} from '../actions/profile';

initialState = {
    profile : {},
    profilePosts:[],
    profilePage:null,
}

export const profilePostReducer = (state=initialState,action) => {
    switch(action.type){
        case SETPROFILEPOSTS:
            return {
                ...state,
                profilePosts: action.posts
            }
        case SETMOREPROFILEPOSTS:
            const morePosts = [...state.profilePosts, ...action.posts]
            return {
                ...state,
                profilePosts: morePosts 
            }
        case SETPROFILEPAGE:
            return {
                ...state,
                profilePage: action.page
            }
        case LIKEPROFILEPOST:
            if(state.profilePosts){
                let profilePostIndex = state.profilePosts.findIndex(post=>post.id===action.postId)
                const updatedProfilePosts = [...state.profilePosts]
                
                if(profilePostIndex >= 0){
                    updatedProfilePosts[profilePostIndex] = action.post
                }
                return {
                    ...state,
                    profilePosts: updatedProfilePosts
                }
            }
        case SETPROFILE:
            if(state){
                return {
                    ...state,
                    profile : action.profile
                }
            }
        default:
            return state
    }
}