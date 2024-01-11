import '../App.css';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleClick = () => {logout()}
    const generalGroups = JSON.parse(localStorage.getItem("user")).general || [];
    const execGroups = JSON.parse(localStorage.getItem("user")).execs || [];

    return(
        <div className="flex-shrink-0 p-3 sidebar" style={{ width: '280px' }}>
      <a href="/" className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
        <svg className="bi pe-none me-2" width="30" height="24"></svg>
        <span className="fs-5 fw-semibold">Home</span>
      </a>
    <ul class="list-unstyled ps-0">
      <li class="mb-1">
        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
          Executive
        </button>
        <div class="collapse" id="dashboard-collapse">
        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              {execGroups.map((groupId) => {
                // Find the corresponding student group in studentGroups array
                const studentGroup = JSON.parse(localStorage.getItem("studentGroups")).find(group => group._id === groupId);

                return (
                  <li key={groupId}>
                    <a href={`/execgroup/${encodeURIComponent(studentGroup.name)}`} className="link-body-emphasis d-inline-flex text-decoration-none rounded">
                      {studentGroup ? studentGroup.name : 'Unknown Student Group'}
                    </a>
                  </li>
                );
              })}
            </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
          General
        </button>
        <div class="collapse show" id="home-collapse">
        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              {generalGroups.map((groupId) => {
                // Find the corresponding student group in studentGroups array
                const studentGroup = JSON.parse(localStorage.getItem("studentGroups")).find(group => group._id === groupId);

                return (
                  <li key={groupId}>
                    <a href={`/gengroup/${encodeURIComponent(studentGroup.name)}`} className="link-body-emphasis d-inline-flex text-decoration-none rounded">
                      {studentGroup ? studentGroup.name : 'Unknown Student Group'}
                    </a>
                  </li>
                );
              })}
            </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
          Other
        </button>
        <div class="collapse" id="orders-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="/recognition" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Gain Club Recognition</a></li>
            <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Other</a></li>
          </ul>
        </div>
      </li>
      <li class="border-top my-3"></li>
      <li class="mb-1">
        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
          Account
        </button>
        <div class="collapse" id="account-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Other</a></li>
            <li><a onClick={handleClick} class="link-body-emphasis d-inline-flex text-decoration-none rounded">Log out</a></li>
            <li><a>{user.email}</a></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
    )
}

export default Sidebar