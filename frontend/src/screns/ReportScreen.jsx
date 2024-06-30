import { useNavigate } from "react-router-dom";
import { Button, Col, Grid, Input, Row, SelectPicker, Table } from "rsuite";
import {
  reporteEncabezado,
  reporteData,
  formatoReporte,
} from "../constantes/reportConstantes";
const { Column, HeaderCell, Cell } = Table;

const nombres = reporteData
  .map((empleado, index) => ({
    label: `${empleado.firstName} ${empleado.lastName}`,
    value: index,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

reporteData.sort((a, b) => a.firstName.localeCompare(b.firstName));

export const ReportScreen = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/", { replace: true, preventScrollReset: true });
  };
  return (
    <>
      <h2 style={{ margin: 30 }}>Reportería</h2>

      <div style={{ margin: 30, paddingTop: 10 }}>
        <Grid fluid className="reportInput-Grid">
          <Row>
            <Col xs={24} md={8} lg={2}>
              <h4>Cédula: </h4>
            </Col>
            <Col xs={24} md={8} lg={4}>
              <Input className="reportInput" placeholder="Ingrese una cédula" />
            </Col>
            <Col xs={24} md={8} lg={2}>
              <h4>Nombre: </h4>
            </Col>
            <Col xs={24} md={8} lg={4}>
              <SelectPicker className="reportInput" data={nombres} />
            </Col>
            <Col xs={24} md={8} lg={4}>
              <h4>Formato de reporte: </h4>
            </Col>
            <Col xs={24} md={8} lg={4}>
              <SelectPicker
                className="reportInput"
                data={formatoReporte}
                searchable={false}
              />
            </Col>
          </Row>
        </Grid>
      </div>

      <center>
        <div style={{ width: "75%", paddingTop: 30, marginBottom: 60 }}>
          <Table autoHeight data={reporteData} bordered cellBordered>
            {reporteEncabezado.map((columna) => {
              const { key, label, ...rest } = columna;
              return (
                <Column {...rest} key={key} flexGrow={1}>
                  <HeaderCell>{label}</HeaderCell>
                  <Cell dataKey={key} />
                </Column>
              );
            })}
          </Table>
        </div>
      </center>

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
