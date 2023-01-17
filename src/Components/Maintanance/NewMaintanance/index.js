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

const NewMaintanance = () => {
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

  const data = [];

  const columns = [
    {
      field: "invoiceNumber",
      headerName: "Item ID",
      flex: 1,
    },
    {
      field: "customer",
      headerName: "Item Name",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Charged Amount",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Comment",
      flex: 1,
    },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-4">
          <b>Issue Damage Charge</b>
        </h5>
        <div className="row mt-3">
          <div className="col-lg-4 mb-3 ">
            <label for="exampleDataList" class="form-label">
              Select Customer <span style={{ color: "red" }}>*</span>
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
            <label for="exampleDataList" class="form-label">
              Select Item or Scan Item <span style={{ color: "red" }}>*</span>
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
              Damage Charge <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="itemName"
              //value="2022-12-20"
              required
              //onChange={(e) => onChange(e)}
            />
          </div>
          <div className="col-lg-4 mb-3 ">
            <label for="name" className="form-label">
              Comment <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="itemName"
              //value="25000.00"
              required
              //disabled
              //onChange={(e) => onChange(e)}
            />
          </div>
          <div className="col-lg-4 mb-3 ">
            <label for="name" className="form-label">
              Total Charge <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="itemName"
              //value="25000.00"
              required
              disabled
              //onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className="row">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-primary me-md-2" type="submit">
              Add Item
            </button>
          </div>
        </div>
        <div className="row">
          <div
            className="col-lg-3"
            style={{ width: "200px", height: "200px", border: "solid black" }}
          >
            <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  console.log(result);
                  setProductId(result?.text);
                }
                if (!!error) {
                  console.info(error);
                }
              }}
            />
          </div>
          {/* <div className="col-lg-4 mb-3 ">
          <label for="name" className="form-label">
            <b>Total Amount:</b>
          </label>
          <NumericFormat
            value={120000}
            className="form-control"
            thousandSeparator=","
            prefix=" Rs. "
            displayType="text"
            // onValueChange={(values, sourceInfo) => {
            //   setFormData({
            //     ...formData,
            //     cost: values.value,
            //   });
            //   setDisplayCost(values.formattedValue);
            // }}
            fixedDecimalScale={true}NewMaintanance
            decimalScale={2}
            renderText={(value) => <>{value}</>}
            required
            disabled
          />
        </div> */}
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
        <div className="row">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-primary me-md-2" type="submit">
              Create Maintanance Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMaintanance;
