import {createContext, useReducer, useEffect } from "react"

export const AuthContext = createContext()
export const authReducer = (state, action) =>{
    switch (action.type){
        case "LOGIN":
            return {user: action.payload}
        case "LOGOUT":
            return {user: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
    
        try {
            const user = storedUser ? JSON.parse(storedUser) : null;
    
            if (user) {
                dispatch({ type: "LOGIN", payload: user });
            }
        } catch (error) {
            console.error("Error parsing localStorage user:", error);
            localStorage.removeItem("user");  // Optionally remove invalid data
        }
    }, []);
    

    console.log("AuthContext state: ", state)

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}