import {
    SETHOMEPOSTS,
    SETMOREHOMEPOSTS,
    SETHOMEPAGE,
    LIKEHOMEPOST,
    ADDHOMEPOST,
    DELETEHOMEPOST
} from '../actions/home';


initialState = {
    homePosts:[],
    homePage:null,
}

export const homePostReducer = (state=initialState,action) => {
    switch(action.type){
        case SETHOMEPOSTS:
            return {
                ...state,
                homePosts: action.posts
            }
        case SETMOREHOMEPOSTS:
            const morePosts = [...state.homePosts, ...action.posts]
            return {
                ...state,
                homePosts: morePosts 
            }
        case SETHOMEPAGE:
            return {
                ...state,
                homePage: action.page
            }
        case ADDHOMEPOST:
            if(state.homePosts){
                const addedPosts = [action.post, ...state.homePosts,]
                return {
                    ...state,
                    homePosts: addedPosts
                }
            }
        case LIKEHOMEPOST:
            if(state.homePosts){
                let homePostIndex = state.homePosts.findIndex(post=>post.id===action.postId)
                const updatedHomePosts = [...state.homePosts]
    
                if(homePostIndex >= 0){
                    updatedHomePosts[homePostIndex] = action.post
                }
                return {
                    ...state,
                    homePosts: updatedHomePosts
                }
            }
        case DELETEHOMEPOST: 
            if(state.homePosts){
                return {
                    ...state,
                    homePosts: state.homePosts && state.homePosts.filter(post => post.id !== action.id) 
                }
            }
        default:
            return state
    }
}