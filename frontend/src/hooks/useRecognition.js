import { useState } from "react";

export const useRecognition =() => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const recognition = async (name, email, description, insta, programs) => {
        setIsLoading(true)
        setError(null)
        const groupData = {
            name: name,
            email: email,
            description: description,
            instagram: insta,
            programs: [programs],
        }
        
        const apiBaseUrl = process.env.REACT_APP_API_URL || "http://localhost:4000"; // Default to localhost in non-Docker environment

        const response = await fetch(`${apiBaseUrl}/api/studentgroups`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(groupData),
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            setIsLoading(false)
        }
    }
    return {recognition, isLoading, error}
}