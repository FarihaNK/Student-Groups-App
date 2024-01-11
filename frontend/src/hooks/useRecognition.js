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

        const response = await fetch('/api/studentgroups', {
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