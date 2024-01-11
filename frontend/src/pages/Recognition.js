import { useState } from "react"
import { useRecognition } from "../hooks/useRecognition"

const Recognition = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("")
    const [insta, setInsta] = useState("")
    const [programs, setPrograms] = useState("")
    const {recognition, error, isLoading} = useRecognition()


    const handleSubmit = async (e) => {
        e.preventDefault()

        await recognition(name, email, description, insta, programs)
    }

    return(
        <form className="recognition" onSubmit={handleSubmit}>
            <h3>gain club recognition</h3>
            
            <label>name:</label>
            <input
            type="name"
            onChange={(e) => setName(e.target.value)}
            value = {name}
            />

            <label>email:</label>
            <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value = {email}
            />

            <label>description:</label>
            <input
            type="description"
            onChange={(e) => setDescription(e.target.value)}
            value = {description}
            />

            <label>insta:</label>
            <input
            type="insta"
            onChange={(e) => setInsta(e.target.value)}
            value = {insta}
            />

            <label>programs:</label>
            <input
            type="programs"
            onChange={(e) => setPrograms(e.target.value)}
            value = {programs}
            />

            <button disabled={isLoading}> gain club recognition</button>
            {error && <div className="error">testing this{error}</div>}
        </form>
    )

}

export default Recognition