import {
    SETUSERPOSTS,
    SETMOREUSERPOSTS,
    SETUSERPAGE,
    LIKEUSERPOST,
    ADDUSERPOST,
    DELETEUSERPOST,
    SETUSERPROFILE,
    INCREASEFOLLOWING,
    DECREASEFOLLOWING,
    INCREASEPOSTS,
    DECREASEPOSTS
} from '../actions/user';


initialState = {
    userProfile: {},
    userPosts: [],
    userPage: null,
}


export const userPostReducer = (state=initialState, action) => {
    switch(action.type){
        case SETUSERPOSTS:
            return {
                ...state,
                userPosts: action.posts,
            }
        case SETMOREUSERPOSTS:
            const morePosts = [
                ...state.userPosts, 
                ...action.posts,
            ]
            return {
                ...state,
                userPosts: morePosts,
            }
        case SETUSERPAGE:
            return {
                ...state,
                userPage: action.page,
            }
        case ADDUSERPOST:
            if(state.userPosts){
                const addedPosts = [
                    action.post, 
                    ...state.userPosts,
                ]
                return {
                    ...state,
                    userPosts: addedPosts,
                }
            }
        case LIKEUSERPOST:
            if(state.userPosts){
                let userPostIndex = state.userPosts.findIndex(
                    post => post.id === action.postId
                )
                const updatedUserPosts = [...state.userPosts]
                
                if(userPostIndex >= 0){
                    updatedUserPosts[userPostIndex] = action.post
                }
                return {
                    ...state,
                    userPosts: updatedUserPosts,
                }
            }
        case DELETEUSERPOST:
            if(state.userPosts){
                return {
                    ...state,
                    userPosts: state.userPosts ? 
                                state.userPosts.filter(
                                    post => post.id !== action.id
                                ) :
                                [],
                }
            }
        case SETUSERPROFILE:
            if(state){
                return {
                    ...state,
                    userProfile : action.profile,
                }
            }
        case INCREASEFOLLOWING:
            if(state.userProfile){
                let increasedUserProfile = {...state.userProfile}
                increasedUserProfile.following_count += 1
                return {
                    ...state,
                    userProfile : increasedUserProfile,
                }
            }
        case DECREASEFOLLOWING:
            if(state.userProfile){
                let decreasedUserProfile = {...state.userProfile}
                decreasedUserProfile.following_count -= 1
                return {
                    ...state,
                    userProfile : decreasedUserProfile,
                }
            }
        case INCREASEPOSTS:
            if(state.userProfile){
                let increasedUserPosts = {...state.userProfile}
                increasedUserPosts.posts += 1
                return {
                    ...state,
                    userProfile : increasedUserPosts,
                }
            }
        case DECREASEPOSTS:
            if(state.userProfile){
                let decreasedUserPosts = {...state.userProfile}
                decreasedUserPosts.posts -= 1
                return {
                    ...state,
                    userProfile : decreasedUserPosts,
                }
            }
        default:
            return state
    }
}