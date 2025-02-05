import { useState } from "react";

export const usePostAnnouncement =() => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const postAnnouncement = async (studentGroupname, text) => {
        setIsLoading(true)
        setError(null)
        const postData = {
            groupname: studentGroupname,
            text: text,
        }
        
        const apiBaseUrl = process.env.REACT_APP_API_URL || "http://35.192.53.79"; // Default to localhost in non-Docker environment

        const response = await fetch(`${apiBaseUrl}/api/announcements`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postData),
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
    return {postAnnouncement, isLoading, error}
}