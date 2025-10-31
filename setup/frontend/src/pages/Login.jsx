import { useNavigate } from "react-router-dom";

function Login()
{
    const navigate = useNavigate();

    const goToSignup = () => {
        navigate("/signup");
    };

    const gotoHome = () => {
        navigate("/home");
    }

    return(
        <div>
            <p>Still Under Construction!</p>
            <button onClick={goToSignup}>Go to signup</button>
            <button onClick={gotoHome}>Go to Home</button>
            
        </div>
    )
}

export default Login;