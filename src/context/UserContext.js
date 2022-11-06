import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { 
    createContext,
    useContext,
    useEffect,
    useState,
} from "react"
import { useNavigate } from "react-router-dom";
import { FirebaseAuth } from "./FirebaseContext";


// user context, that require all of the user functionality, such as login and register

// create user context
const UserContext = createContext();

// load firebase context



export const AuthProvider = ({children}) => {
    const {auth, app} = FirebaseAuth()
    // create state user, and set it data to info from local storage
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("auth-user")))
    

    // create new user
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name,
        });
    }

    // login user
    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout user
    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                
                localStorage.setItem("auth-user", JSON.stringify(user))
            } else {
                localStorage.removeItem('auth-user');
                setUser(null);
            }
          });
          return () => {
            unsubscribe()
          }
          
    }, [auth])

    return (
        <UserContext.Provider value={{user, createUser, logout, logIn, updateName}}
        >
            {children}
        </UserContext.Provider>
    )
    

}

export const UserAuth = () => {
    return useContext(UserContext)
}
