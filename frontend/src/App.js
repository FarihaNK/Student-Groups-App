import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Sidebar from './components/Sidebar';
import Apply from './pages/Apply';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      {/* {user ? <Sidebar /> : <Navbar />} */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/apply" element={<Apply />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
