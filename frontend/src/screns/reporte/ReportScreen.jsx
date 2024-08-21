import { useNavigate } from "react-router-dom";
import { Button, Col, Grid, Input, Panel, Row, SelectPicker } from "rsuite";
import {
  reporteData,
  monthPicker,
  reporteEncabezados,
  yearPicker,
} from "../../constantes/reportConstantes";
import { ConsultaButon } from "./ConsultaButton";
import { useState } from "react";
import { ReporteTable } from "./ReporteTable";
import { ModalDetalle } from "./ModalDetalle";

// const nombres = reporteData
//   .map((empleado, index) => ({
//     label: `${empleado.firstName} ${empleado.lastName}`,
//     value: index,
//   }))
//   .sort((a, b) => a.label.localeCompare(b.label));

export const ReportScreen = () => {
  const [reporte, setReporte] = useState([]);
  const [cedula, setCedula] = useState("");
  const [nombres, setNombres] = useState([]);
  const [nombreValue, setNombreValue] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedEmployeeNo, setSelectedEmployeeNo] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/", { replace: true, preventScrollReset: true });
  };

  const handleCedulaChange = (value) => {
    // Verificar si el valor tiene solo dígitos y no más de 10 caracteres
    if (/^\d{0,10}$/.test(value)) {
      setCedula(value);
    }
  };

  const nombreSeleccionado =
    nombres.find((n) => n.value === nombreValue)?.label || "";

  // Filtrar los datos del reporte basado en la cédula y el nombre
  const filteredReporte = reporte.filter(
    (item) =>
      item.employeeNo.includes(cedula) &&
      item.name.toLowerCase().includes(nombreSeleccionado.toLowerCase())
  );

  return (
    <>
      <ModalDetalle
        open={open}
        setOpen={setOpen}
        employeeNo={selectedEmployeeNo}
        reporte={reporte}
      />
      <Panel bordered style={{ margin: 24 }}>
        <h2 style={{ marginBottom: 30, marginLeft: 5 }}>Reportería</h2>

        <center>
          <Grid fluid className="reportInput-Grid">
            <Row>
              <Col lg={6} />
              <Col xs={24} md={8} lg={1} className="lblInfo">
                <h4>Año:</h4>
              </Col>
              <Col xs={24} md={8} lg={4}>
                <SelectPicker
                  className="reportInput"
                  data={yearPicker}
                  searchable={false}
                  placeholder={"Seleccione un año"}
                  onChange={(year) => setYear(year)}
                />
              </Col>
              <Col xs={24} md={8} lg={1} className="lblInfo">
                <h4>Mes:</h4>
              </Col>
              <Col xs={24} md={8} lg={4}>
                <SelectPicker
                  className="reportInput"
                  data={monthPicker}
                  searchable={false}
                  placeholder={"Seleccione un mes"}
                  onChange={(month) => setMonth(month)}
                />
              </Col>
              <Col xs={24} md={8} lg={2}>
                <ConsultaButon
                  reporte={reporte}
                  setReporte={setReporte}
                  nombres={nombres}
                  setNombres={setNombres}
                  year={year}
                  month={month}
                  setOpen={setOpen}
                  setSelectedEmployeeNo={setSelectedEmployeeNo}
                />
              </Col>
            </Row>
          </Grid>
        </center>

        <center>
          <div style={{ width: "75%", paddingTop: 30, marginBottom: 60 }}>
            <ReporteTable
              reporteData={filteredReporte}
              reporteEncabezado={reporteEncabezados}
            />
            {reporte.length > 0 ? (
              <Row>
                <Col xs={24} md={8} lg={5} className="lblInfo">
                  <h4>Cédula: </h4>
                </Col>
                <Col xs={24} md={8} lg={6}>
                  <Input
                    className="reportInput"
                    placeholder="Ingrese una cédula"
                    value={cedula}
                    onChange={handleCedulaChange}
                  />
                </Col>
                {/* <Col lg={3} /> */}
                <Col xs={24} md={8} lg={3} className="lblInfo">
                  <h4>Nombre: </h4>
                </Col>
                <Col xs={24} md={8} lg={7}>
                  <SelectPicker
                    placement="topStart"
                    className="reportInput"
                    data={nombres}
                    value={nombreValue}
                    placeholder="Seleccione un nombre"
                    onChange={(value) => setNombreValue(value)}
                  />
                </Col>
              </Row>
            ) : (
              <></>
            )}
          </div>
        </center>
      </Panel>
      <Button
        className="returnButton"
        onClick={handleNavigate}
        appearance="primary"
      >
        Regresar
      </Button>
    </>
  );
};
