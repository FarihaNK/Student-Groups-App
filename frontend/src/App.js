import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Sidebar from './components/Sidebar';
import Apply from './pages/Apply';
import Recognition from './pages/Recognition';
import GenGroup from './pages/GenGroup';
import ExecGroup from './pages/ExecGroup';
import Announcements from './pages/Announcements';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      {user ? <Sidebar /> : <Navbar />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/apply/:studentGroupname/:type" element={user ? <Apply />: <Navigate to="/login"/>} />
          <Route path="/gengroup/:studentGroupname" element={<GenGroup />} />
          <Route path="/execgroup/:studentGroupname" element={<ExecGroup />} />
          <Route path="/recognition" element={<Recognition />} />
          <Route path="/announcements" element={<Announcements />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
