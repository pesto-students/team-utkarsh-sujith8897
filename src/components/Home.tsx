import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth";

export const Home = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Navigate to="/login" />;
  }

  return <div>Home</div>;
};
