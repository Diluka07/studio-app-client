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
    <div className="card">
      <div className="card-body">
      <h5 className="card-title mb-4">
          <b>New Item Maintanance</b>
        </h5>
        <div className="row mt-3">
          <div className="col-lg-4 mb-3 ">
            <label for="exampleDataList" class="form-label">
              Select Item <span style={{ color: "red" }}>*</span>
            </label>

            <select
              className="form-select"
              aria-label="Default select example"
              //onChange={(e) => onChange(e)}
              //value={category}
              name="category"
            >
              <option value="">--Select--</option>
              {/* {!loadingCategories &&
                    categoryError === null &&
                    categories.length > 0
                      ? categories.map((c) => (
                          <option value={c.id}>{c.name} </option>
                        ))
                      : []} */}
            </select>
          </div>
          <div className="col-lg-4 mb-3 ">
            <label for="name" className="form-label">
              Customer Name
            </label>
            <input
              type="text"
              className="form-control"
              name="itemName"
              value="Diluka Hewage"
              required
              disabled
              //onChange={(e) => onChange(e)}
            />
          </div>
          <div className="col-lg-4 mb-3 ">
            <label for="name" className="form-label">
              Date of Rent <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              className="form-control"
              name="itemName"
              //value="2022-12-20"
              required
              //onChange={(e) => onChange(e)}
            />
          </div>
          <div className="col-lg-4 mb-3 ">
            <label for="name" className="form-label">
              Date of Rent End <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              className="form-control"
              name="itemName"
              //value="2022-12-20"
              required
              //onChange={(e) => onChange(e)}
            />
          </div>
          <div className="col-lg-4 mb-3 ">
            <label for="name" className="form-label">
              Total Amount
            </label>
            <input
              type="text"
              className="form-control"
              name="itemName"
              value="00.00"
              required
              disabled
              //onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className="row">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-primary me-md-2" type="submit">
              Create New Studio ental
            </button>
          </div>
        </div>
        {/* <div className="mt-3" style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            loading={false}
            components={{ Toolbar: CustomToolbar }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default NewItemRental;
