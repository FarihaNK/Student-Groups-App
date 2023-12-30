import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useEffect, useState } from 'react';
import Home from './pages/Home';

function App() {

  const [studentGroups, setStudentGroups] = useState(null)

  useEffect(() => {
    const fetchgroups = async () => {
      const response = await fetch("/api/studentgroups")
      const json = await response.json()

      if (response.ok) {
        setStudentGroups(json)
      }
    }

    fetchgroups()
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
      <Home/>
      <div className='studentgroups'>
        {studentGroups && studentGroups.map((studentGroups) => (
          <p key={studentGroups._id}>{studentGroups.name}</p>
        ))}
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
