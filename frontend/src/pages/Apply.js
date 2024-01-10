import { useState } from "react"
import { useApply } from "../hooks/useApply"
import { useParams } from 'react-router-dom';

const Apply = () => {
    const [what, setWhat] = useState("")
    const [why, setWhy] = useState("")
    const {apply, error, isLoading} = useApply()

    const { studentGroupname } = useParams();

    const user = JSON.parse(localStorage.getItem("user"))
    const userId = user.userid;

    const groupArray = JSON.parse(localStorage.getItem("studentGroups"))
    const foundGroup = groupArray.find(group => group.name === studentGroupname)
    const groupId = foundGroup._id

    const handleSubmit = async (e) => {
        e.preventDefault()

        await apply(userId, groupId)
    }

    return(
        <form className="apply" onSubmit={handleSubmit}>
            <h3>apply for {decodeURIComponent(studentGroupname)}</h3>
            
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