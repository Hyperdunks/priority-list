import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signout() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/signin");
    }, 500);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
      <div className="bg-white border border-gray-100 rounded-2xl shadow p-6 text-center">
        <div className="animate-pulse text-gray-700">Signing you out…</div>
      </div>
    </div>
  );
}

export default Signout;
