import { HashRouter, Route, Routes, Link, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/context/theme";
import { Footer, Header, Page, ScrollManager, ScrollRuler } from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Contact from "@/pages/Contact";
import Classified from "@/pages/Classified";

function NotFound() {
  return (
    <section className="frame sec-pad py-32 text-center">
      <p className="mono text-ink3">404</p>
      <h1 className="display mt-4 text-[clamp(3rem,10vw,8rem)]">Lost the trail.</h1>
      <p className="lede mt-4">That page doesn't exist.</p>
      <Link to="/" className="btn btn-solid mt-8">Back home</Link>
    </section>
  );
}

function Routed() {
  const loc = useLocation();
  return (
    <Page key={loc.pathname}>
      <Routes location={loc}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/classified" element={<Classified />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Page>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      {/* HashRouter: the build is a single self-contained index.html, so routes live in the hash. */}
      <HashRouter>
        <ScrollManager />
        <Header />
        <ScrollRuler />
        <Routed />
        <Footer />
      </HashRouter>
    </ThemeProvider>
  );
}
