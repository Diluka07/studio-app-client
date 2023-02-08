import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import {
  getAllCustomersAsync,
  customersDataReset,
} from "../../../Redux/slices/customer";
import { setAlertData, alertDataReset } from "../../../Redux/slices/alert";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

const CustomerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading: loadingcustomersData,
    data: customersData,
    error: error,
  } = useSelector((state) => state.customer.customersData);

  const {
    loading: userLoading,
    data: user,
    error: userError,
  } = useSelector((state) => state.authentication.loggedUserData);

  useEffect(() => {
    dispatch(getAllCustomersAsync());
    return () => {
      dispatch(customersDataReset());
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
    navigate(`/update-customer/${id}`);
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
      headerName: "Customer Name",
      flex: 1,
    },
    {
      field: "nic",
      headerName: "NIC",
      flex: 1,
    },
    {
      field: "contactNumber1",
      headerName: "Contact Number",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 1,
      renderCell: (params) => (
        <>
          {user && user.role == "manager" && (
            <i
              className="bi bi-pencil-square"
              style={{ color: "green", fontSize: "18px", cursor: "pointer" }}
              onClick={() => handleEditClick(params.id)}
            ></i>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-lg-4">
            <h5 className="card-title mb-4">
              <b>Customer List</b>
            </h5>
          </div>
          <div className="col">
            {" "}
            <div class="col">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
                <button
                  className="btn btn-primary me-md-2"
                  type="button"
                  onClick={() => navigate("/customer-register")}
                >
                  Add New Customer
                </button>
              </div>
            </div>{" "}
          </div>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={customersData}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            getRowId={(row) => row._id}
            loading={loadingcustomersData}
            components={{ Toolbar: CustomToolbar }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
