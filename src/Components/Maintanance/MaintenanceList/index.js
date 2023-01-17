import React, { useState, useEffect } from "react";
import {
  getProductAsync,
  getProductDataReset,
} from "../../../Redux/slices/product";
import { setAlertData, alertDataReset } from "../../../Redux/slices/alert";
import { useDispatch, useSelector } from "react-redux";
import { QrReader } from "react-qr-reader";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { NumericFormat } from "react-number-format";

const NewItemRental = () => {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState("No result");

  useEffect(() => {
    if (productId) {
      dispatch(getProductAsync(productId));
    }
  }, [dispatch, productId]);
  const [productsToRent, setProductsToRent] = useState([]);

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
  ];

  const columns = [
    {
      field: "invoiceNumber",
      headerName: "Invoice Id",
      flex: 1,
    },
    {
      field: "customer",
      headerName: "Customer Name",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Rental Date",
      flex: 1,
    },
    {
      field: "rdate",
      headerName: "Return Date",
      flex: 1,
    },
    {
      field: "tamt",
      headerName: "Total Amount",
      flex: 1,
    },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-4">
          <b>Item Rental Report</b>
        </h5>
        <div className="row">
          <div className="col-lg-2 mb-3 ">
            <label for="name" className="form-label">
              From <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              className="form-control"
              name="itemName"
              required
              //onChange={(e) => onChange(e)}
            />
          </div>
          <div className="col-lg-2 mb-3 ">
            <label for="name" className="form-label">
              To <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              className="form-control"
              name="itemName"
              required
              //onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className="mt-3" style={{ height: 400, width: "100%" }}>
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
      </div>
    </div>
  );
};

export default NewItemRental;
