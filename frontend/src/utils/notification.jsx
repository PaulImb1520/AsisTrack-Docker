import { Notification, toaster } from "rsuite";

const showNotification = (type, header, mensaje) => {
  toaster.push(
    <Notification type={type} header={header}>
      {mensaje}
    </Notification>,
    { placement: "topEnd" }
  );
};

export const notification = {
  success: (mensaje) => showNotification("success", "Éxito", mensaje),
  error: (mensaje) => showNotification("error", "Error", mensaje),
  warning: (mensaje) => showNotification("warning", "Advertencia", mensaje),
  info: (mensaje) => showNotification("info", "Información", mensaje),
};
