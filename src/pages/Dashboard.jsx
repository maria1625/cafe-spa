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

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    margin: "20px 0 10px 0",
    fontSize: "28px",
  },
  subtitle: {
    margin: "0",
    color: "#666",
    fontSize: "16px",
  },
};

export default LoginForm;