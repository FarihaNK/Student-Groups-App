import { useState } from "react"
import { usePostAnnouncement } from "../hooks/usePostAnnouncement"
import { useParams } from 'react-router-dom';

const PostAnnouncement = () => {
    const [text, setText] = useState("")
    const {postAnnouncement, error, isLoading} = usePostAnnouncement()

    const { studentGroupname } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault()

        await postAnnouncement(studentGroupname, text)
    }

    return(
        <form className="postAnnouncement" onSubmit={handleSubmit}>
            <h3>Post Announcement for {decodeURIComponent(studentGroupname)}</h3>

            <label>Announcement:</label>
            <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            value = {text}
            />

            <button disabled={isLoading}> Post</button>
            {error && <div className="error">testing this{error}</div>}
        </form>
    )

}

export default PostAnnouncement