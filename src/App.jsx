import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import TemplatesPage from "@/pages/Templates";
import Navbar from "@/layout/Navbar";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<TemplatesPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
