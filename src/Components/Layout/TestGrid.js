import { useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { Typography } from "@mui/material";

const TestGrid = () => {
  const [pageSize, setPageSize] = useState(5);
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }
  const columns = [
    {
      field: "formNumber",
      headerName: "Form #",
      width: 100,
    },
    {
      field: "title",
      headerName: "Title",
      width: 190,
    },
    {
      field: "createdUser",
      headerName: "Requestor",
      width: 190,
    },
    {
      field: "amount",
      headerName: "Amount (LKR)",
      width: 150,
      //   renderCell: (params) => (
      //     <NumberFormat
      //       value={params.row.amount}
      //       displayType={"text"}
      //       fixedDecimalScale={true}
      //       thousandSeparator={true}
      //       decimalScale={2}
      //     />
      //   ),
    },
    // {
    //   field: "createdDate",
    //   headerName: "Requested On",
    //   width: 150,
    //   valueFormatter: ({ value }) =>
    //     `${moment(new Date(value)).format("YYYY-MM-DD")}`,
    //   renderCell: (params) => (
    //     <Typography style={{ fontSize: "14px" }}>
    //       {params.row.createdDate &&
    //         moment(new Date(params.row.createdDate)).format("YYYY-MM-DD")}
    //     </Typography>
    //   ),
    // },
    {
      field: "expenceTypeName",
      headerName: "Expense Type",
      width: 190,
    },
  ];

  return (
    <div style={{ height: 1000, width: "100%" }}>
      <DataGrid
        rows={[]}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        loading={false}
        components={{ Toolbar: CustomToolbar }}
      />
    </div>
  );
};

export default TestGrid;
