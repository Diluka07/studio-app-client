import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import {
  getAllMusicalItemsAsync,
  getAllMusicalItemsDataReset,
} from "../../../Redux/slices/musicalItem";
import { setAlertData, alertDataReset } from "../../../Redux/slices/alert";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

const ItemList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading: loadingMusicalItems,
    data: musicalItems,
    error: error,
  } = useSelector((state) => state.musicalItem.musicalItemsData);

  useEffect(() => {
    dispatch(getAllMusicalItemsAsync());
    return () => {
      dispatch(getAllMusicalItemsDataReset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(
        setAlertData({ msg: "Something went wrong", alertType: "error" })
      );
      setTimeout(() => dispatch(alertDataReset()), 5000);
    }
  }, [dispatch, error]);

  const handleEditClick = (id) => {
    navigate(`/update-item/${id}`);
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
      field: "name",
      headerName: "Item Name",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Full Quantity",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell: (params) => <>{params.row.category.name}</>,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <NumericFormat
          value={params.row.cost}
          displayType="text"
          fixedDecimalScale={true}
          thousandSeparator=","
          prefix={"Rs. "}
          decimalScale={2}
        />
      ),
    },
    {
      field: "inStockQuantity",
      headerName: "In Stock",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 1,
      renderCell: (params) => (
        <i
          className="bi bi-pencil-square"
          style={{ color: "green", fontSize: "18px", cursor: "pointer" }}
          onClick={() => handleEditClick(params.id)}
        ></i>
      ),
    },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div class="col-lg-4">
            <h5 className="card-title mb-4">
              <b>Item List</b>
            </h5>
          </div>
          <div class="col">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
              <button
                className="btn btn-primary me-md-2"
                type="button"
                onClick={() => navigate("/new-item")}
              >
                Add New Item
              </button>
            </div>
          </div>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={musicalItems}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            getRowId={(row) => row._id}
            loading={loadingMusicalItems}
            components={{ Toolbar: CustomToolbar }}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemList;
