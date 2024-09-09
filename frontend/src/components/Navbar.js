import '../App.css';
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar() {
    const {user} = useAuthContext();

    return (
        <div className="navbar-container">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="/">MyApp</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active text-white" href="/">Home</a>
                            </li>
                            {!user && (
                                <div className="login-signup-nav">
                                    <li className="nav-item">
                                        <a className="nav-link active text-white" href="/login">Login</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active text-white" href="/signup">Signup</a>
                                    </li>
                                </div>
                            )}
                            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Clubs
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/announcements">Announcements</a></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
                </li>
                <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-light" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
