import { useNavigate } from "react-router-dom";
import { Button, Input, Panel } from "rsuite";

const LoginScreen = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/reporte");
  };

  return (
    <>
      <div className="loginPanel-container">
        <Panel bordered className="loginPanel">
          <h1 className="logTitle">Login</h1>

          <form>
            <h4 className="logSubTitle">Usuario:</h4>
            <Input placeholder="Nombre de usuario" />

            <h4 className="logSubTitle">Contraseña:</h4>
            <Input placeholder="Contraseña" />
          </form>

          <center>
            <Button
              className="loginButton"
              onClick={handleNavigate}
              appearance="primary"
              size="lg"
            >
              Acceder
            </Button>
          </center>
        </Panel>
      </div>
    </>
  );
};

export default LoginScreen;
