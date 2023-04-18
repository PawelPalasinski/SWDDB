import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Cards from "./pages/Cards";
import PersonalCollection from "./pages/PersonalCollection";
import About from "./pages/About";
import Test from "./pages/Test";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/collection" element={<PersonalCollection />} />
        <Route path="/test" element={<Test />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
