import {
  empleadosData,
  reportesEndpoint,
  reportesWithDateEndpoint,
} from "../constantes/urlEndpoints";
import { http } from "../utils";

const getReportesMensuales = () => http.post(`${reportesEndpoint}`);

const getReportesMensualesWithDate = (year, month) =>
  http.post(`${reportesWithDateEndpoint}${year}/${month}/`);

const getEmpleadosData = () => http.get(`${empleadosData}/`);

const getSingleEmpleadoData = (cedula) =>
  http.get(`${empleadosData}cedula/${cedula}/`);

export {
  getReportesMensuales,
  getReportesMensualesWithDate,
  getEmpleadosData,
  getSingleEmpleadoData,
};
