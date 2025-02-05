import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin =() => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const apiBaseUrl = process.env.REACT_APP_API_URL || "http://35.192.53.79"; // Default to localhost in non-Docker environment

        const response = await fetch(`${apiBaseUrl}/api/user/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            //save user to local storage
            localStorage.setItem("user", JSON.stringify(json))

            //update authcontect
            dispatch({type: "LOGIN", payload: json} )
            setIsLoading(false)
        }
    }
    return {login, isLoading, error}
}