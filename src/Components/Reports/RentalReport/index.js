import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import {
    getAllProductinvoicesAsync,
    productInvoicesDataReset,
  } from "../../../Redux/slices/invoice";
import { setAlertData, alertDataReset } from "../../../Redux/slices/alert";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import moment from "moment";

const RentalReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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



  const [pageSize, setPageSize] = useState(5);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport
          csvOptions={{
            fileName: `Rental Report`,
          }}
        />
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
  ];


  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div class="col-lg-4">
            <h5 className="card-title mb-4">
              <b>Rental Report</b>
            </h5>
          </div>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={productInvoicesData}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            getRowId={(row) => row._id}
            loading={productInvoicesLoading}
            components={{ Toolbar: CustomToolbar }}
          />
        </div>
      </div>
    </div>
  );
};

export default RentalReport;
