import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';

function App() {
  // Function to create a card for each student group
  const createCard = (title, text) => {
    return (
      <div className="card" style={{ width: '18rem', margin: '10px' }}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    );
  };

  // Dictionary
  const [studentGroups, setStudentGroups] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch('/api/studentgroups');
      const json = await response.json();

      if (response.ok) {
        setStudentGroups(json);
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

  // Return statement
  return (
    <div className="App">
      <BrowserRouter>
        <Home />
        <div className="studentgroups">{groupCards}</div>
      </BrowserRouter>
    </div>
  );
}

export default App;
