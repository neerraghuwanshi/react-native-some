import { 
    AUTHERROR, 
    AUTHSUCCESS, 
    AUTHSTART, 
    LOGOUT
} from '../actions/auth';


initialState = {
    token: null,
    username: null,
    error: null,
    loading: null
}


export const authReducer = (state=initialState,action) => {
    switch(action.type){
        case AUTHSTART:
            return {
                ...state,
                loading: true,
                error: null,
                token : null,
                userId : null,
            }
        case AUTHSUCCESS:
            return {
                ...state,
                token : action.token,
                username : action.username,
                loading: null,
                error: null,
            }
        case AUTHERROR:
                return {
                    ...state,
                    error: action.error,
                    loading: null,
                }
        case LOGOUT:
                return {
                   initialState
                }
        default:
            return state
    }
}


