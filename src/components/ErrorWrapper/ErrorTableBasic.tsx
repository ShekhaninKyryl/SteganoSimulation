import * as React from "react";
import { DataGrid, GridColumns, GridRowData } from '@mui/x-data-grid';
import { useTableStyles } from "../Table/Table";
import { Box } from "@material-ui/core";
import CustomError from "../../entities/CustomError/CustomError";

const ColumnConfig = {
  id: {
    value: "id",
    name: "File names",
  },
  stgBlock: {
    value: "stgBlock",
    name: "Steganoblocks",
  },
  clusters: {
    value: "clusters",
    name: "Clusters",
  }
}


const columns: GridColumns = [
  { field: ColumnConfig.id.value, headerName: ColumnConfig.id.name, flex: 1, sortable: false },
  { field: ColumnConfig.stgBlock.value, headerName: ColumnConfig.stgBlock.name, sortable: false, minWidth: 130 },
  { field: ColumnConfig.clusters.value, headerName: ColumnConfig.clusters.name, sortable: false, minWidth: 130 },
];


type ReturnType = { [key in keyof typeof ColumnConfig]: number | string }
export const parseToRowsBasic = ({ basic, fileSystem }: CustomError): ReturnType[] => fileSystem?.files.map((file, index) => {
  return {
    id: file.name,
    clusters: file.clusters.length,
    stgBlock: basic?.filter(b => b === index).length || 0,
  }
}) || [];


interface IProps {
  rows: GridRowData[];
}

const ErrorTableBasic: React.FC<IProps> = ({ rows }) => {
  const classes = useTableStyles();
  return <Box>
    <div style={{ width: 400 }} className={classes.root}>
      <DataGrid
        className={classes.table}
        autoHeight={true}
        disableColumnFilter={true}
        disableColumnMenu={true}
        disableColumnSelector={true}
        disableSelectionOnClick={true}
        disableDensitySelector={true}
        showCellRightBorder={true}
        showColumnRightBorder={true}
        density={"compact"}

        rows={rows}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[4]}
        hideFooter={rows.length <= 4}
        getRowClassName={(params) =>
          `custom--${Number(params.getValue(params.id, 'stgBlock')) > Number(params.getValue(params.id, 'clusters')) ? "error" : "ok"}`}
      />
    </div>
  </Box>;
}

export default ErrorTableBasic;