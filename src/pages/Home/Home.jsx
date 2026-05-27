import ProjectSection from "../../components/ProjectSection/ProjectSection";
import Hero from "../../components/Hero/Hero";
import Skills from "../../components/Skills/Skills";

function Home() {
    return (
        <div className="home-page">
            <Hero/>
            <Skills/>
            <ProjectSection/>
        </div>
    );
}

export default Home;