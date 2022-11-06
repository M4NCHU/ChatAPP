import { 
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react"
import { FirebaseAuth } from "./FirebaseContext";
import { UserAuth } from "./UserContext";

const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    const {auth, app} = FirebaseAuth()
    const {user} = UserAuth()
    
   const INITIAL_STATE = {
    chatId:"null",
    user:{}
   }

   const chatReducer = (state, action) => {
    switch (action.type){
        case "CHANGE_USER":
            return {
                user:action.payload,
                chatId:user.uid > action.payload.uid
                ? user.uid + action.payload.uid
                : action.payload.uid + user.uid
            }
        default:
            return state
    }
   }

   const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return (
        <ChatContext.Provider value={{data:state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )

}

export const ChatAuth = () => {
    return useContext(ChatContext)
}
