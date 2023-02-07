import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProductAsync,
  getProductDataReset,
} from "../../../Redux/slices/product";
import { getAllCustomersAsync } from "../../../Redux/slices/customer";
import {
  createProductinvoiceAsync,
  createProductinvoiceResponseDataReset,
} from "../../../Redux/slices/invoice";
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
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { NumericFormat } from "react-number-format";
import $ from "jquery";

const NewItemRental = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const [formData, setFormData] = useState({
    customerId: "",
    returnDate: "",
    returnTime: "",
    totalRentalCost: null,
    cashierId: "",
  });
  const { customerId, returnDate, returnTime } = formData;

  const [IsItemsAdding, setIsItemsAdding] = useState(true);

  const [successMsgDisplay, setSuccessMsgDisplay] = useState(false);
  const [itemRemovedMsgDisplay, setItemRemovedMsgDisplay] = useState(false);

  const [productsToRent, setProductsToRent] = useState([]);

  var today = new Date();
  var dd = String(today.getDate() + 1).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  $("#date_picker").attr("min", today);

  const {
    loading: loadingCustomersData,
    data: customersData,
    error: customersError,
  } = useSelector((state) => state.customer.customersData);

  const {
    loading: loadingProductData,
    data: productData,
    error: productError,
  } = useSelector((state) => state.product.productData);

  const {
    loading: userLoading,
    data: user,
    error: userError,
  } = useSelector((state) => state.authentication.loggedUserData);

  const {
    loading: productInvoiceCreateResponseLoading,
    data: productInvoiceCreateResponseData,
    error: productInvoiceCreateResponseError,
  } = useSelector((state) => state.invoice.productInvoiceCreateResponse);

  useEffect(() => {
    if (
      productInvoiceCreateResponseData &&
      productInvoiceCreateResponseError === null
    ) {
      dispatch(
        setAlertData({
          msg: "Invoice Created Successfully",
          alertType: "success",
        })
      );
      setTimeout(() => dispatch(alertDataReset()), 3000);
      navigate(`/dashboard`);
    }
    return () => {
      dispatch(createProductinvoiceResponseDataReset());
    };
  }, [productInvoiceCreateResponseData]);

  useEffect(() => {
    return () => {
      dispatch(getProductDataReset());
    };
  }, [dispatch]);

  // calculate total rental cost
  useEffect(() => {
    if (returnDate && returnTime) {
      const rentingDate = new Date();
      const returningDate = new Date(returnDate);
      const diffTime = Math.abs(returningDate - rentingDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      let returningTimeSplit = returnTime.split(":");

      if (productsToRent.length) {
        let total = 0;
        for (let i = 0; i < productsToRent.length; i++) {
          total =
            total + productsToRent[i].costPerItem * productsToRent[i].quantity;
        }
        if (returningTimeSplit[0] > 12) {
          setFormData({
            ...formData,
            totalRentalCost: total * (diffDays + 1),
          });
        } else if (returningTimeSplit[0] < 12 && returningTimeSplit[0] > 10) {
          setFormData({
            ...formData,
            totalRentalCost: total * diffDays + (total * diffDays) / 2,
          });
        } else {
          setFormData({
            ...formData,
            totalRentalCost: total * diffDays,
          });
        }
      } else {
        setFormData({
          ...formData,
          totalRentalCost: 0,
        });
      }
    }
  }, [productsToRent, returnDate, returnTime]);

  useEffect(() => {
    dispatch(getAllCustomersAsync());
  }, []);

  useEffect(() => {
    if (user && !userLoading) {
      setFormData({
        ...formData,
        cashierId: user._id,
      });
    }
  }, [user, userLoading]);

  useEffect(() => {
    if (productId && IsItemsAdding) {
      dispatch(getProductAsync(productId));
    } else if (productId && !IsItemsAdding) {
      removeItemfromList(productId);
    }
  }, [dispatch, productId]);

  //item adding to rental list
  useEffect(() => {
    if (productData && !loadingProductData) {
      if (!productData.isRemoved && !productData.isRented) {
        if (
          productsToRent.length &&
          productsToRent.find((p) => p.itemCode === productData.itemCode._id)
        ) {
          setProductsToRent((preProducts) =>
            preProducts.map((i) => {
              if (i.itemCode === productData.itemCode._id) {
                if (!i.itemIds.find((id) => id === productData._id)) {
                  setSuccessMsgDisplay(true);
                  setTimeout(() => setSuccessMsgDisplay(false), 3000);
                  // setFormData({
                  //   ...formData,
                  //   totalRentalCost: formData.totalRentalCost + i.costPerItem,
                  // });
                  return {
                    ...i,
                    quantity: i.quantity + 1,
                    itemIds: [...i.itemIds, productData._id],
                  };
                }
                return i;
              }
              return i;
            })
          );
        } else {
          setProductsToRent([
            ...productsToRent,
            {
              itemCode: productData.itemCode._id,
              itemName: productData.itemCode.name,
              costPerItem: productData.itemCode.cost,
              quantity: 1,
              itemIds: [productData._id],
            },
          ]);
          // setFormData({
          //   ...formData,
          //   totalRentalCost:
          //     formData.totalRentalCost + productData.itemCode.cost,
          // });
          setSuccessMsgDisplay(true);
          setTimeout(() => setSuccessMsgDisplay(false), 3000);
        }
      } else {
        dispatch(
          setAlertData({
            msg: productData.isRemoved
              ? "This product is removed from the stock"
              : "This product is still in a rental",
            alertType: "warning",
          })
        );
        setTimeout(() => dispatch(alertDataReset()), 3000);
      }
      setProductId("");
    }
  }, [dispatch, productData]);

  //removing items from rental list
  const removeItemfromList = (productId) => {
    if (productId) {
      setProductsToRent((preProducts) => {
        const newProducts = preProducts.map((pro) => {
          const newItems = pro.itemIds.filter((i) => i !== productId);
          if (newItems.length !== pro.itemIds.length) {
            setItemRemovedMsgDisplay(true);
            setTimeout(() => setItemRemovedMsgDisplay(false), 3000);
            // setFormData({
            //   ...formData,
            //   totalRentalCost:
            //     formData.totalRentalCost - productData.itemCode.cost,
            // });
            return {
              ...pro,
              quantity: pro.quantity - 1,
              itemIds: newItems,
            };
          }
          return pro;
        });
        return newProducts.filter((i) => i.itemIds.length > 0);
      });
      setProductId("");
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProductinvoiceAsync({
        formData: formData,
        products: productsToRent,
      })
    );
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
          <b>New Product Rental</b>
        </h5>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="row mt-3">
            <div className="col-lg-4 mb-3 ">
              <label for="exampleDataList" class="form-label">
                Select Customer <span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => onChange(e)}
                value={customerId}
                name="customerId"
                required
              >
                <option value="">--Select--</option>
                {!loadingCustomersData && customersData.length > 0
                  ? customersData.map((c) => (
                      <option value={c._id}>{c.name + " " + c.nic} </option>
                    ))
                  : []}
              </select>
            </div>
            <div className="col-lg-4 mb-3 ">
              <label for="name" className="form-label">
                Return Date <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="date_picker"
                type="date"
                className="form-control"
                name="returnDate"
                value={returnDate}
                required
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="col-lg-4 mb-3 ">
              <label for="name" className="form-label">
                Return Time <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="time"
                className="form-control"
                name="returnTime"
                value={returnTime}
                required
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="col-lg-4 mb-3 ">
              <label for="name" className="form-label">
                Total Amount
              </label>
              <NumericFormat
                value={formData.totalRentalCost}
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
          </div>
          <div className="row">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                className="btn btn-primary me-md-2"
                type="submit"
                disabled={!productsToRent.length}
              >
                Create Invoice
              </button>
            </div>
          </div>
        </form>

        <span style={{ color: IsItemsAdding ? "cadetblue" : "brown" }}>
          <b>
            {" "}
            {IsItemsAdding
              ? "Scan to add items to rent"
              : "Scan to remove items from list"}{" "}
          </b>
        </span>
        {successMsgDisplay && <Chip label="success" color="success" />}
        {itemRemovedMsgDisplay && <Chip label="Removed" color="warning" />}

        <div className="col-lg-3" style={{ width: "200px", height: "200px" }}>
          <QrReader
            constraints={{
              facingMode: "environment",
            }}
            onResult={(result, error) => {
              if (!!result) {
                setProductId(result?.text);
              }
              // if (!!error) {
              //   console.info(error);
              // }
            }}
          />
        </div>
        <div className="mt-4 mb-4">
          <Button
            variant="outlined"
            color={IsItemsAdding ? "error" : "success"}
            onClick={() => setIsItemsAdding(!IsItemsAdding)}
          >
            {IsItemsAdding ? "Remove Items" : "Add Items"}
          </Button>
        </div>

        <div className="mt-3" style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={productsToRent}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            getRowId={(row) => row.itemCode}
            loading={false}
            components={{ Toolbar: CustomToolbar }}
          />
        </div>
      </div>
    </div>
  );
};

export default NewItemRental;
