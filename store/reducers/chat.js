import { 
    SETCHATPAGE, 
    SETCHATMESSAGES, 
    SETMORECHATMESSAGES,
} from '../actions/chat';


initialState = {
    page: null,
    messages: null,
}

export const authReducer = (state=initialState,action) => {
    switch(action.type){
        case SETCHATPAGE:
            return {
                ...state,
                page: action.page,
            }
        case SETCHATMESSAGES:
            return {
                ...state,
                messages: action.messages,
            }
        case SETMORECHATMESSAGES:
            const moreMessages = [
                ...state.messages, 
                ...action.messages,
            ]
            return {
                ...state,
                messages: moreMessages,
            }
        default:
            return state
    }
}