import { useState } from "react"
import { useApply } from "../hooks/useApply"

const Apply = (studentGroupname) => {
    const [what, setWhat] = useState("")
    const [why, setWhy] = useState("")
    const {apply, error, isLoading} = useApply()

    const userId = "yourUserId";

    const handleSubmit = async (e) => {
        e.preventDefault()

        await apply(userId, studentGroupname)
    }

    return(
        <form className="apply" onSubmit={handleSubmit}>
            <h3>apply</h3>
            
            <label>what:</label>
            <input
            type="what"
            onChange={(e) => setWhat(e.target.value)}
            value = {what}
            />

            <label>why:</label>
            <input
            type="why"
            onChange={(e) => setWhy(e.target.value)}
            value = {why}
            />

            <button disabled={isLoading}> apply</button>
            {error && <div className="error">testing this{error}</div>}
        </form>
    )

}

export default Apply