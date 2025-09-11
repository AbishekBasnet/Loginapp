import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home'; // ✅ Environment as Home

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} /> {/* Environment is now Home */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
