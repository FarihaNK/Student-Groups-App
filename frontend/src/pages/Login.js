import { useState } from "react"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(email, password)
    }

    return(
        <form className="login" onSubmit={handleSubmit}>
            <h3>log in</h3>
            
            <label>email:</label>
            <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value = {email}
            />

            <label>password:</label>
            <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value = {password}
            />

            <button>log in</button>
        </form>
    )

}

export default Login