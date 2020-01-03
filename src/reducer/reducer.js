const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"
const SIGNUP = "SIGNUP"
const SET_SOCKET = "SET_SOCKET"
const GET_USER = "GET_USER"
const RECEIVED_MESSAGE = "RECEIVED_MESSAGE"
const UPDATE_USER = "UPDATE_USER"


const initStore = {
    user:{
        logged:false,
        url:""
    },
    messages:[],
    socket:null
}

const rootReducer = (state=initStore,action)=>{
    if(action.type===LOGIN){
        return {
            ...state,
            user: {
                ...state.user,
                ...action.data
            }
        }
    }
    else if(action.type===SIGNUP){
        return {
            ...state,
            user: {
                ...state.user,
                ...action.data
            }
        }
    }
    else if(action.type===LOGOUT){
        return {
            ...initStore
        }
    }
    else if(action.type===SET_SOCKET){
        return{
            ...state,
            socket: action.data
        }
    }
    else if(action.type===UPDATE_USER){
        return {
            ...state,
            user:{...state.user,...action.data}
        }
    }
    else if (action.type===RECEIVED_MESSAGE){
        return{
            ...state,
            messages: [...state.messages,action.data]
        }
    }
    else if(action.type===GET_USER){
        return {
            ...state,
            user:{...state.user,...action.data}
        }
    }
    return state
}

export default rootReducer