import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const ExecGroup = () => {

    const { studentGroupname } = useParams();

    const user = JSON.parse(localStorage.getItem("user"))
    const userId = user.userid;

    const groupArray = JSON.parse(localStorage.getItem("studentGroups"))
    const foundGroup = groupArray.find(group => group.name === studentGroupname)

    return(
        <div>
            <div className="info">
                <h1>this is {studentGroupname} executive</h1>
                <h3>{foundGroup.description}</h3>
                <h5>{foundGroup.email}</h5>
                <h5>{foundGroup.instagram}</h5>
                <h5>{foundGroup.programs}</h5>
            </div>
            <div class="card" style={{ width: '18rem', margin: '10px' }}>
                <div class="card-body">
                    <h5 class="card-title">Post an Announcement</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <Link to={`/postannouncement/${encodeURIComponent(studentGroupname)}`} className="btn btn-primary">
                        Post
                    </Link>
                </div>
            </div>
            <div class="card" style={{ width: '18rem', margin: '10px' }}>
                <div class="card-body">
                    <h5 class="card-title">Prepare for Audit</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Prepare</a>
                </div>
            </div>
            <div class="card" style={{ width: '18rem', margin: '10px' }}>
                <div class="card-body">
                    <h5 class="card-title">Book a room</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="https://app.utm.utoronto.ca/rbs/BookAResource.action" class="btn btn-primary">Book</a>
                </div>
            </div>
        </div>
    )

}

export default ExecGroup