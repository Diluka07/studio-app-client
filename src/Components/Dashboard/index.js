import * as React from "react";
import { useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import GroupsIcon from "@mui/icons-material/Groups";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Dashboard = () => {
  const [age, setAge] = React.useState("10");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
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

  const data = [
    {
      id: 1,
      invoiceNumber: "I564",
      customer: "Diluka Hewage",
      date: "2022-10-09",
      amount: 47890.0,
    },
    {
      id: 2,
      invoiceNumber: "I234",
      customer: "Diluka Hewage",
      date: "2022-10-09",
      amount: 47890.0,
    },
    {
      id: 3,
      invoiceNumber: "I786",
      customer: "Diluka Hewage",
      date: "2022-10-09",
      amount: 47890.0,
    },
    {
      id: 4,
      invoiceNumber: "I146",
      customer: "Diluka Hewage",
      date: "2022-10-09",
      amount: 47890.0,
    },
    {
      id: 5,
      invoiceNumber: "I097",
      customer: "Diluka Hewage",
      date: "2022-10-09",
      amount: 47890.0,
    },
  ];

  const columns = [
    {
      field: "invoiceNumber",
      headerName: "Invoice Number",
      flex: 1,
    },
    {
      field: "customer",
      headerName: "Customer Name",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Rented Date",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount (LKR)",
      flex: 1,
    },
  ];

  return (
    <>
      <div className="row mb-2">
        <div className="col-lg-3 mb-2">
          <div className="card" style={{ backgroundColor: "#5BA4AA" }}>
            <div className="card-body">
              <h5 className="card-title">
                New Rentals{" "}
                <CheckCircleOutlineIcon
                  fontSize="large"
                  style={{ color: "#FFFFFF", marginBottom: "5px" }}
                >
                  {" "}
                </CheckCircleOutlineIcon>
              </h5>
              <h2 className="card-text">10</h2>
            </div>
          </div>
        </div>
        <div className="col-lg-3 mb-2">
          <div className="card" style={{ backgroundColor: "#4095C4" }}>
            <div className="card-body">
              <h5 className="card-title">
                New Customers{" "}
                <GroupsIcon
                  fontSize="large"
                  style={{ color: "#FFFFFF", marginBottom: "5px" }}
                ></GroupsIcon>
              </h5>
              <h2 className="card-text">10</h2>
            </div>
          </div>
        </div>
        <div className="col-lg-3 mb-2">
          <div className="card" style={{ backgroundColor: "#2C6BAA" }}>
            <div className="card-body">
              <h5 className="card-title">
                Last Month Income{" "}
                <AttachMoneyIcon
                  fontSize="large"
                  style={{ color: "#FFFFFF", marginBottom: "5px" }}
                ></AttachMoneyIcon>
              </h5>
              <h2 className="card-text">250000.00</h2>
            </div>
          </div>
        </div>
        <div className="col-lg-3 mb-2">
          <div className="card" style={{ backgroundColor: "#404FA5" }}>
            <div className="card-body">
              <h5 className="card-title">
                This Month Income{" "}
                <AttachMoneyIcon
                  fontSize="large"
                  style={{ color: "#FFFFFF", marginBottom: "5px" }}
                ></AttachMoneyIcon>
              </h5>
              <h2 className="card-text">56000.00</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 mb-2">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select value={age} onChange={handleChange}>
            <MenuItem value={10}>Ongoing Rentals</MenuItem>
            <MenuItem value={20}>Late Returns</MenuItem>
            <MenuItem value={30}>Finished Rentals</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          loading={false}
          components={{ Toolbar: CustomToolbar }}
        />
      </div>
    </>
  );
};

export default Dashboard;
