import { useEffect, useState } from "react";
import { getSingleEmpleadoData } from "../../services/reportService";
import { Button, Col, Grid, Modal, Row } from "rsuite";

export const ModalDetalle = ({ open, setOpen, employeeNo, reporte }) => {
  const [modalLabels, setModalLabels] = useState(null);

  useEffect(() => {
    if (open) {
      const selectedEmployeeData = reporte.find(
        (obj) => obj.employeeNo === employeeNo
      );

      getSingleEmpleadoData(employeeNo)
        .then((res) => {
          const aux = {
            ...res.data,
            ...selectedEmployeeData,
          };
          setModalLabels(aux);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [open]);

  const calculateSalary = (value) => {
    let valorDia = parseFloat(value) / 30;
    let valorHora = valorDia / 8;
    let valorHoraExtra = valorHora * 1.5;
    return (modalLabels.overTimeHours * valorHoraExtra).toFixed(2);
  };

  return (
    <>
      {open ? (
        <Modal open={open} size="sm">
          <Modal.Title className="modalTitle">Detalle</Modal.Title>
          <Modal.Header closeButton={false} />
          <Modal.Body className="modal-body">
            {modalLabels ? (
              <Grid style={{ width: "100%" }}>
                <h4 style={{ paddingBottom: "16px" }}>Identidad</h4>
                <Row className="row">
                  <Col lg={3} className="col-title">
                    Nombre:
                  </Col>
                  <Col lg={12} className="col-center">
                    {modalLabels.nombre_completo}
                  </Col>
                  <Col lg={3} className="col-title">
                    Cédula:
                  </Col>
                  <Col lg={6} className="col-center">
                    {modalLabels.cedula}
                  </Col>
                </Row>
                <h4 style={{ paddingBottom: "16px", paddingTop: "32px" }}>
                  Horas
                </h4>
                <Row className="row">
                  <Col lg={12} className="col-title">
                    Horas Regulares
                  </Col>
                  <Col lg={12} className="col-right">
                    {modalLabels.actualHours + " hrs. /mes"}
                  </Col>
                  <Col lg={12} className="col-title">
                    Horas extras (+50%):
                  </Col>
                  <Col lg={12} className="col-right">
                    {modalLabels.overTimeHours + " hrs. /mes"}
                  </Col>
                </Row>
                <h4 style={{ paddingBottom: "16px", paddingTop: "32px" }}>
                  Salario
                </h4>
                <Row>
                  <Col lg={12} className="col-title">
                    Salario Mensual:
                  </Col>
                  <Col lg={12} className="col-right">
                    {modalLabels.sueldo}
                  </Col>
                </Row>
                <Row className="row">
                  <Col lg={12} className="col-title">
                    Salario por Hora (calculado):
                  </Col>
                  <Col lg={12} className="col-right">
                    {modalLabels.salario_hora}
                  </Col>
                </Row>
                <Row
                  style={{ paddingBottom: "16px", paddingTop: "32px" }}
                  className="row"
                >
                  <Col lg={12} className="col-payment-title">
                    <h4>Salario extra por pagar: </h4>
                  </Col>
                  <Col lg={12} className="col-payment-title col-right">
                    {calculateSalary(modalLabels.sueldo)}
                  </Col>
                </Row>
              </Grid>
            ) : (
              <p>Cargando datos...</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button appearance="primary" onClick={() => setOpen(false)}>
              Regresar
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
};
