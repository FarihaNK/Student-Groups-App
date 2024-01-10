import { useState } from "react";

export const useApply =() => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const apply = async (userId, studentGroupname) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`/api/user/${userId}/addStudentGroup`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({studentGroupId: studentGroupname, groupType: "general"}),
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // //save user to local storage
            // localStorage.setItem("user", JSON.stringify(json))

            // //update authcontect
            // dispatch({type: "LOGIN", payload: json} )
            setIsLoading(false)
        }
    }
    return {apply, isLoading, error}
}