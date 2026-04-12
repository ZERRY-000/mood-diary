import "./Home.css";
import Navbar from "../components/Navbar.jsx";

const Home = () => {

  return (
    <>
    
    <div className="home-wrapper">
      <Navbar />
      <div className="home-content">
        <h1 className="regular">Welcome to <span className="bold text-color-1">Mood</span>diary</h1>
        <h2 className="light">"keep noticing your feelings"</h2>
        {/* <div className="light text-lg">- Ihave.n01dea</div> */}
      </div>
    </div>
    </>
  );
};

export default Home;