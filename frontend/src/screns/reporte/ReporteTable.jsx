import { useState } from "react";
import { Pagination, Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

export const ReporteTable = ({ reporteData, reporteEncabezado }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const start = (page - 1) * limit;
  const end = start + limit;
  const dataToDisplay = reporteData.slice(start, end);

  return (
    <>
      <div style={{ width: "75%", paddingTop: 30, marginBottom: 60 }}>
        <Table
          autoHeight
          data={dataToDisplay}
          bordered
          cellBordered
          locale={{ emptyMessage: "No existen registros que coincidan." }}
        >
          {reporteEncabezado.map((columna) => {
            const { key, label, ...rest } = columna;
            return (
              <Column {...rest} key={key} flexGrow={1}>
                <HeaderCell
                  style={{ backgroundColor: "#169de0", color: "white" }}
                >
                  {label}
                </HeaderCell>
                <Cell dataKey={key} />
              </Column>
            );
          })}
        </Table>
        <div style={{ paddingTop: 20 }}>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="xs"
            layout={["total", "-", "limit", "|", "pager", "skip"]}
            total={reporteData.length}
            limitOptions={[10]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </div>
      </div>
    </>
  );
};
