import { Button, IconButton, Notification, toaster } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import {
  getEmpleadosData,
  getReportesMensuales,
  getReportesMensualesWithDate,
} from "../../services/reportService";
import { notification } from "../../utils/index";

const convertToHours = (minutos) => {
  let horas = minutos / 60;
  return horas.toFixed(2);
};

export const ConsultaButon = ({
  reporte,
  setReporte,
  nombres,
  setNombres,
  year,
  month,
  setOpen,
  setSelectedEmployeeNo,
}) => {
  const handleConsultar = () => {
    if (year != null && month != null) {
      getReportesMensualesWithDate(year, month)
        .then((res) => {
          console.log(res);
          let data = res.data.data;
          if (data.length > 0) {
            //Traer toda la data
            let reporteData = [];
            data.map((it) => {
              reporteData.push({
                employeeNo: it.employeeNo,
                name: it.name,
                groupName: it.groupName,
                actualHours: convertToHours(
                  it.workDuration.actual -
                    (it.absence.duration +
                      it.earlyLeave.duration +
                      it.late.duration)
                ),
                overTimeHours: convertToHours(
                  it.overTimeDuration.normal + it.overTimeDuration.special
                ),
                detailButton: (
                  <Button
                    size="sm"
                    appearance="ghost"
                    className="tableDetailButton"
                    onClick={() => {
                      setSelectedEmployeeNo(it.employeeNo);
                      setOpen(true);
                    }}
                  >
                    Detalle
                  </Button>
                ),
              });
            });
            setReporte(reporteData);
            console.log("reporte: ", reporte);

            //Crear lista de nombres
            let nombresList = [];
            data.map((it, index) => {
              nombresList.push({
                label: it.name,
                value: index,
              });
            });
            setNombres(nombresList);
          }
        })
        .catch((error) => {
          console.log(error);
          setReporte([]);
          setNombres([]);
        });
    } else {
      // Mostrar notificación
      notification.warning(
        "Por favor, proporcione los valores para el año y el mes."
      );
    }
  };

  return (
    <>
      <center>
        <IconButton
          className="consultarButton"
          appearance="primary"
          icon={<SearchIcon />}
          onClick={handleConsultar}
        >
          Consultar
        </IconButton>
      </center>
    </>
  );
};
