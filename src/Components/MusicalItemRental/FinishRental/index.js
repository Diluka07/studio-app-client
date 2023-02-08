import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSingleProductInvoiceAsync,
  invoiceDataReset,
  finishProductInvoiceAsync,
  invoiceFinishResponseReset,
} from "../../../Redux/slices/invoice";
import { setAlertData, alertDataReset } from "../../../Redux/slices/alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { NumericFormat } from "react-number-format";
import moment from "moment";

const FinishRental = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5);
  const [products, setProducts] = useState([]);

  const {
    loading: loadingInvoiceData,
    data: invoiceData,
    error: invoiceDataError,
  } = useSelector((state) => state.invoice.invoiceData);

  const {
    loading: loadingInvoiceFinisResponse,
    data: invoiceFinisResponse,
    error: invoiceFinisResponseError,
  } = useSelector((state) => state.invoice.invoiceFinisResponse);

  useEffect(() => {
    if (invoiceFinisResponse) {
      dispatch(
        setAlertData({
          msg: "Invoice Finished Successfully",
          alertType: "success",
        })
      );
      setTimeout(() => dispatch(alertDataReset()), 3000);
      navigate(`/dashboard`);
    }
  }, [dispatch, invoiceFinisResponse]);

  useEffect(() => {
    if (params.id) {
      dispatch(getSingleProductInvoiceAsync(params.id));
    }
    return () => {
      dispatch(invoiceDataReset());
      dispatch(invoiceFinishResponseReset());
    };
  }, [dispatch, params]);

  useEffect(() => {
    if (invoiceData) {
      setProducts(invoiceData.items);
    }
  }, [invoiceData]);

  const finishRental = () => {
    console.log(invoiceData);
    dispatch(
      finishProductInvoiceAsync({
        id: invoiceData._id,
        products: invoiceData.items,
      })
    );
  };

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
      field: "itemName",
      headerName: "Item Name",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "costPerItem",
      headerName: "Rental Cost Per Day (One Item)",
      flex: 1,
      renderCell: (params) => (
        <NumericFormat
          value={params.row.costPerItem}
          displayType="text"
          fixedDecimalScale={true}
          thousandSeparator=","
          prefix={"Rs. "}
          decimalScale={2}
        />
      ),
    },
    {
      field: "amount",
      headerName: "Total Cost for Item(s)",
      flex: 1,
      renderCell: (params) => (
        <NumericFormat
          value={params.row.costPerItem * params.row.quantity}
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
        <h5 className="card-title mb-4">
          <b>Rental Details</b>
        </h5>
        <div>
          <div className="row mt-3">
            <div className="col-lg-4 mb-3 ">
              <label for="exampleDataList" class="form-label">
                Customer
              </label>

              <input
                type="text"
                className="form-control"
                value={invoiceData && invoiceData.customer.name}
                disabled
              />
            </div>
            <div className="col-lg-4 mb-3 ">
              <label for="name" className="form-label">
                Rental Date
              </label>
              <input
                type="text"
                className="form-control"
                value={
                  invoiceData &&
                  moment(new Date(invoiceData.rentalDate)).format("YYYY-MM-DD")
                }
                disabled
              />
            </div>
            <div className="col-lg-4 mb-3 ">
              <label for="name" className="form-label">
                Return Date
              </label>
              <input
                type="text"
                className="form-control"
                value={
                  invoiceData &&
                  moment(new Date(invoiceData.expectedReturnDate)).format(
                    "YYYY-MM-DD"
                  )
                }
                disabled
              />
            </div>
            <div className="col-lg-4 mb-3 ">
              <label for="name" className="form-label">
                Total Amount
              </label>
              <NumericFormat
                value={invoiceData && invoiceData.rentalCost}
                className="form-control"
                thousandSeparator=","
                prefix=" Rs. "
                displayType="input"
                fixedDecimalScale={true}
                decimalScale={2}
                renderText={(value) => <>{value}</>}
                required
                disabled
              />
            </div>
            <div className="col-lg-4 mb-3 ">
              <label for="name" className="form-label">
                Cashier
              </label>
              <input
                type="text"
                className="form-control"
                value={invoiceData && invoiceData.cashierRent.name}
                disabled
              />
            </div>
          </div>

          <div className="mt-3" style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={products}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              getRowId={(row) => row.itemCode}
              loading={false}
              components={{ Toolbar: CustomToolbar }}
            />
          </div>
          {invoiceData && !invoiceData.isFinished && (
            <div className="row mt-3">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  className="btn btn-primary me-md-2"
                  type="button"
                  onClick={() => finishRental()}
                >
                  Finish Rental
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinishRental;
