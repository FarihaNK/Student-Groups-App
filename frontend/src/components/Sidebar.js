import '../App.css';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const {logout} = useLogout();
    const {user} = useAuthContext();

    const handleClick = () => { logout(); };
    const generalGroups = JSON.parse(localStorage.getItem("user")).general || [];
    const execGroups = JSON.parse(localStorage.getItem("user")).execs || [];

    return (
        <div className="flex-shrink-0 p-3 sidebar" style={{ width: '280px' }}>
            <a href="/" className="d-flex align-items-center pb-3 mb-3 link-light text-decoration-none border-bottom">
                <svg className="bi pe-none me-2" width="30" height="24"></svg>
                <span className="fs-5 fw-semibold text-white">Home</span>
            </a>
            <ul className="list-unstyled ps-0">
            <li><a className="mb-1" href="/announcements">Announcements</a></li>
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed text-white" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse">
                        Executive
                    </button>
                    <div className="collapse" id="dashboard-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            {execGroups.map((groupId) => {
                                const studentGroup = JSON.parse(localStorage.getItem("studentGroups")).find(group => group._id === groupId);
                                return (
                                    <li key={groupId}>
                                        <a href={`/execgroup/${encodeURIComponent(studentGroup.name)}`} className="link-light d-inline-flex text-decoration-none rounded">
                                            {studentGroup ? studentGroup.name : 'Unknown Student Group'}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed text-white" data-bs-toggle="collapse" data-bs-target="#home-collapse">
                        General
                    </button>
                    <div className="collapse" id="home-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            {generalGroups.map((groupId) => {
                                const studentGroup = JSON.parse(localStorage.getItem("studentGroups")).find(group => group._id === groupId);
                                return (
                                    <li key={groupId}>
                                        <a href={`/gengroup/${encodeURIComponent(studentGroup.name)}`} className="link-light d-inline-flex text-decoration-none rounded">
                                            {studentGroup ? studentGroup.name : 'Unknown Student Group'}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </li>
                <li className="border-top my-3"></li>
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed text-white" data-bs-toggle="collapse" data-bs-target="#account-collapse">
                        Account
                    </button>
                    <div className="collapse" id="account-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><a className="link-light d-inline-flex text-decoration-none rounded">Other</a></li>
                            <li><a onClick={handleClick} className="link-light d-inline-flex text-decoration-none rounded">Log out</a></li>
                            <li><a className="link-light d-inline-flex text-decoration-none rounded">{user.email}</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;
