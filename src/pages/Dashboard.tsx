import { MenuDrawer } from "../components/MenuDrawer";
import { useUser } from "../Hooks/useUser";
import { Navigate, Outlet } from "react-router-dom";
import { ImageCarousel } from "../components/ImageCarousel";

const Dashboard = () => {
  const { username } = useUser();

  if (!username) return <Navigate to="/" />;

  return (
    <div>
      <MenuDrawer />
      <ImageCarousel/>
      <main className="container mt-2 pt-3">
        <Outlet /> 
      </main>
    </div>
  );
};

export default Dashboard;
