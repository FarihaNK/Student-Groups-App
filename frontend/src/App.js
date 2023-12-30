import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useEffect, useState } from 'react';

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
      hello
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
