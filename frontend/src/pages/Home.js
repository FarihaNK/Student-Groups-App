import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {

   // Retrieve state from local storage on mount
   const initialState = JSON.parse(localStorage.getItem('studentGroups')) || null;
   const [studentGroups, setStudentGroups] = useState(initialState);
 
    // Function to create a card for each student group
  const createCard = (title, text) => {
    return (
      <div className="card" style={{ width: '18rem', margin: '10px' }}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
          <Link to={`/apply/${encodeURIComponent(title)}/general`} className="btn btn-primary">
          Become a member
        </Link>
        </div>
      </div>
    );
  };

  // Dictionary
  useEffect(() => {
    const fetchGroups = async () => {
      
      const apiBaseUrl = process.env.REACT_APP_API_URL || "http://35.192.53.79"; // Default to localhost in non-Docker environment

      const response = await fetch(`${apiBaseUrl}/api/studentgroups`);
      const json = await response.json();

      if (response.ok) {
        setStudentGroups(json);
        // Store the state in local storage
        localStorage.setItem('studentGroups', JSON.stringify(json));
      }
    };
    fetchGroups();
  }, []);

  // Map the student groups to create cards
  const groupCards =
    studentGroups &&
    studentGroups.map((studentGroup) => {
      return createCard(studentGroup.name, studentGroup.description);
    });

    return(
        <div className="home-container">
            <div className="studentgroups">{groupCards}</div>
        </div>
    )
}

export default Home;