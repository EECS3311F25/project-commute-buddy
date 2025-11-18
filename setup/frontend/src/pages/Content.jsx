import { useNavigate } from "react-router-dom";


function Content() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>
        Congratulations! If you're here, that means we have you in our database
        as a registered user and you logged in successfully.
      </h1>
      <p>Content page is Under Construction!</p>
      <p>Visit us later for more!</p>

      <br />

      <button onClick={() => navigate("/requests")}>View Commute Requests</button>

    </div>
  );
}
export default Content;
