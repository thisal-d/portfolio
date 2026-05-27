import './App.css';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Projects from "./pages/Projects/Projects";
import Contact from "./pages/Contact/Contact";
import ClassifiedPage from './pages/Classified/Classified';
import ProjectPage from './pages/Project/ProjectPage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/classified"     element={<ClassifiedPage />} />
            <Route path="/"               element={<Home />} />
            <Route path="/about"          element={<About />} />
            <Route path="/projects"       element={<Projects />} />
            <Route path="/contact"        element={<Contact />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

