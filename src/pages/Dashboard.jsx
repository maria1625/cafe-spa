import { useAuth } from "../context/AuthContext";


const Dashboard = () => {
  const { user } = useAuth();

   return (
    <div>
      <h1>Bienvenida {user?.name}</h1>
      <p>Este es tu dashboard ☕</p>
   </div>
 );
};

export default Dashboard;
