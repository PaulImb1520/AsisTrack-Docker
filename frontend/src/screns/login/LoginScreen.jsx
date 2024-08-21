import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "../../utils/index";
import { Panel, Input, InputGroup, Button, Loader } from "rsuite";
import { Visible, EyeClose } from "@rsuite/icons";
import { makeUserValidation } from "../../services/loginService";
import asistrackLogo from "../../assets/asistrackLogo.png";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNavigate = () => {
    if (nombreUsuario.trim() === "" || clave.trim() === "") {
      notification.warning("Los campos no pueden estar vacíos");
      return;
    }

    const userData = {
      nombre_usuario: nombreUsuario.trim(),
      clave: clave.trim(),
    };

    makeUserValidation(userData)
      .then((res) => {
        notification.success(res.data.mensaje);
        setNombreUsuario("");
        setClave("");
        navigate("/reporte");
      })
      .catch((error) => {
        notification.error(error.response.data.mensaje);
      });
  };

  return (
    <>
      <div className="loginPanel-container">
        <Panel bordered className="loginPanel">
          <h1 className="logTitle">Login</h1>
          <center>
            <img src={asistrackLogo} width={200} height={200} />
          </center>

          <form>
            <h4 className="logSubTitle">Usuario:</h4>
            <Input
              placeholder="Nombre de usuario"
              maxLength={15}
              value={nombreUsuario}
              onChange={(value) => setNombreUsuario(value)}
            />

            <h4 className="logSubTitle">Contraseña:</h4>
            <InputGroup inside>
              <Input
                placeholder="Contraseña"
                type={visible ? "text" : "password"}
                maxLength={15}
                value={clave}
                onChange={(value) => setClave(value)}
              />
              <InputGroup.Button onClick={() => setVisible(!visible)}>
                {visible ? <Visible /> : <EyeClose />}
              </InputGroup.Button>
            </InputGroup>
          </form>

          <center>
            <Button
              className="loginButton"
              onClick={handleNavigate}
              appearance="primary"
              size="lg"
              loading={loading}
              disabled={loading}
            >
              {loading ? "Cargando..." : "Acceder"}
            </Button>
          </center>

          {loading && (
            <div className="spinner-container">
              <Loader center size="lg" content="Validando..." />
            </div>
          )}
        </Panel>
      </div>
    </>
  );
};

export default LoginScreen;
