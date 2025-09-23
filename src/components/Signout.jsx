import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/signin");
  }, [navigate]);

  return null;
}

export default Signout;
