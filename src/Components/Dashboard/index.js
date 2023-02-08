import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllProductinvoicesAsync,
  productInvoicesDataReset,
} from "../../Redux/slices/invoice";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import GroupsIcon from "@mui/icons-material/Groups";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Chip from "@mui/material/Chip";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { NumericFormat } from "react-number-format";
import moment from "moment";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [age, setAge] = React.useState("10");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [pageSize, setPageSize] = useState(5);

  const {
    loading: productInvoicesLoading,
    data: productInvoicesData,
    error: productInvoicesError,
  } = useSelector((state) => state.invoice.productInvoices);

  useEffect(() => {
    dispatch(getAllProductinvoicesAsync());
    return () => {
      dispatch(productInvoicesDataReset());
    };
  }, [dispatch]);

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
      field: "name",
      headerName: "Customer",
      flex: 1,
      renderCell: (params) => <div>{params.row.customer.name}</div>,
    },
    {
      field: "customer",
      headerName: "Rental Date",
      flex: 1,
      renderCell: (params) => (
        <div>
          {moment(new Date(params.row.rentalDate)).format("YYYY-MM-DD")}
        </div>
      ),
    },
    {
      field: "date",
      headerName: "Return Date",
      flex: 1,
      renderCell: (params) => (
        <div>
          {moment(new Date(params.row.expectedReturnDate)).format("YYYY-MM-DD")}
        </div>
      ),
    },
    {
      field: "amount",
      headerName: "Amount (LKR)",
      flex: 1,
      renderCell: (params) => (
        <NumericFormat
          value={params.row.rentalCost}
          displayType="text"
          fixedDecimalScale={true}
          thousandSeparator=","
          prefix={"Rs. "}
          decimalScale={2}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <div>
          <Chip
            label={params.row.isFinished ? "Finished" : "Ongoing"}
            color={params.row.isFinished ? "success" : "primary"}
          />
        </div>
      ),
    },
    {
      field: "view",
      headerName: "View",
      flex: 1,
      renderCell: (params) => (
        <i
          className="bi bi-eye-fill"
          style={{ color: "green", fontSize: "25px", cursor: "pointer" }}
          onClick={() => navigate(`/item-rental/${params.row._id}`)}
        ></i>
      ),
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
          rows={productInvoicesData}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          loading={productInvoicesLoading}
          getRowId={(row) => row._id}
          components={{ Toolbar: CustomToolbar }}
        />
      </div>
    </>
  );
};

export default Dashboard;
