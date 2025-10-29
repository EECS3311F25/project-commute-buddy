import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="home">
      <h1>Welcome to Commute Buddy</h1>
      <p>Find fellow YorkU commuters easily!</p>
      <button onClick={goToSignup}>Get Started</button>
    </div>
  );
}

export default Home;
