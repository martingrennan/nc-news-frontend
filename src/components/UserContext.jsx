import { useState, createContext, useEffect } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'))
        if (loggedInUser) {
            setUser(loggedInUser)
        }
    }, [])

    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
}