import React, { createContext, useEffect, useState } from 'react'

export const AuthenticationContext = createContext()

function AuthContext({ children }) {

    const [isAuthorizes, setIsAuthorizes] = useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsAuthorizes(true)
        }else{
            setIsAuthorizes(false)
        }
    },[isAuthorizes])

    return (
        <>
            <AuthenticationContext.Provider value={{isAuthorizes,setIsAuthorizes}}>
                {children}
            </AuthenticationContext.Provider>

        </>
    )
}

export default AuthContext