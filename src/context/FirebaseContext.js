import { createContext, useContext } from "react";
import {app, auth, storage, db} from "../lib/Firebase"

// Create firebase contexts
const FirebaseContext = createContext();

// Firebase provider
export const FirebaseProvider = ({children}) => {
    return (
        <FirebaseContext.Provider value={{app, auth, storage, db}}>
            {children}
        </FirebaseContext.Provider>
    )
}

export const FirebaseAuth = () => {
    return useContext(FirebaseContext);
}