import * as React from "react";
import { DataGrid, GridColumns, GridRowData } from '@mui/x-data-grid';

import { createTheme, darken, lighten, makeStyles } from '@material-ui/core/styles';
import { Palette } from "@material-ui/core/styles/createPalette";

function getThemePaletteMode(palette: Palette) {
  return palette.type;
}

const defaultTheme = createTheme();
export const useTableStyles = makeStyles(
  (theme) => {
    const getBackgroundColor = (color: string) =>
      getThemePaletteMode(theme.palette) === 'dark'
        ? darken(color, 0.2)
        : lighten(color, 0.2);

    const getHoverBackgroundColor = (color:string) =>
      getThemePaletteMode(theme.palette) === 'dark'
        ? darken(color, 0.1)
        : lighten(color, 0.1);

    return {
      root: {
        '& .custom--error': {
          backgroundColor: getBackgroundColor(theme.palette.error.main),
          '&:hover': {
            backgroundColor: getHoverBackgroundColor(theme.palette.error.main),
          },
        },
        '& .custom--ok': {
          backgroundColor: getBackgroundColor(theme.palette.success.main),
          '&:hover': {
            backgroundColor: getHoverBackgroundColor(theme.palette.success.main),
          },
        },
      },
      table: {
        color: "inherit",
      },
    };
  },
  { defaultTheme },
);

interface IProps {
  rows: GridRowData[];
  columns: GridColumns;
} 



const Table: React.FC<IProps> = ({ columns, rows }) => {
  return <div style={{ height: 320, width: 500, backgroundColor: "white", opacity:0.85 }}>
    <DataGrid
      disableColumnFilter={true}
      disableColumnMenu={true}
      disableColumnSelector={true}
      disableSelectionOnClick={true}
     

      rows={rows}
      columns={columns}
      pageSize={4}
      rowsPerPageOptions={[4]}
    />
  </div>;
}

export default Table;