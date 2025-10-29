import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup");
  };

  const gotoLogin = () => {
    navigate("/login");
  }

  return (
    <div className="home">
      <h1>Welcome to Commute Buddy</h1>
      <p>Find your perfect commute buddy - safer, faster, together.</p>
      <button onClick={goToSignup}>Get Started</button>
      <button onClick={gotoLogin}>Login</button>
      <p>Learn More</p>
    </div>
  );
}

export default Home;
