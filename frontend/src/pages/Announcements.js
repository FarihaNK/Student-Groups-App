import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Announcements() {

   // Retrieve state from local storage on mount
   const [announcements, setAnnouncements] = useState("");
 
    // Function to create a card for each student group
  const createCard = (groupname, text) => {
    return (
      <div className="card" style={{ width: '18rem', margin: '10px' }}>
        <div className="card-body">
          <h5 className="card-title">{groupname}</h5>
          <p className="card-text">{text}</p>
        </div>
      </div>
    );
  };

  // Dictionary
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const response = await fetch('/api/announcements');
      const json = await response.json();

      if (response.ok) {
        setAnnouncements(json);
      }
    };
    fetchAnnouncements();
  }, []);

  // Map the student groups to create cards
  const announcementsCards =
    announcements &&
    announcements.map((announcement) => {
      return createCard(announcement.groupname, announcement.text);
    });

    return(
        <div className="home-container">
            <h1>announcements</h1>
            <div className="announcements">{announcementsCards}</div>
        </div>
    )
}

export default Announcements;