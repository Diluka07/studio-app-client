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

const UserList = () => {
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

  const data = [
    {
      id: 1,
      name: "Diluka Hewage",
      nic: "669547912V",
      contact: "diluka@gmail.com",
      date: "Cashier",
    },
    {
      id: 2,
      name: "Kamal Perera",
      nic: "985684423V",
      contact: "kamal@gmail.com",
      date: "Cashier",
    },
    {
      id: 3,
      name: "Nuwan Chamara",
      nic: "669845523V",
      contact: "nuwan@gmail.com",
      date: "Manager",
    },
    {
      id: 4,
      name: "Sandun Fernando",
      nic: "985684423V",
      contact: "sandun@gmail.com",
      date: "Manager",
    },
    {
      id: 5,
      name: "Reno Amarasekara",
      nic: "985684423V",
      contact: "reno@gmail.com",
      date: "Manager",
    },
  ];

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "nic",
      headerName: "NIC",
      flex: 1,
    },
    {
      field: "contact",
      headerName: "Username",
      flex: 1,
    },
    {
      field: "date",
      headerName: "User Type",
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
          //onClick={() => handleEditClick(params.id)}
        ></i>
      ),
    },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-4">
          <b>User List</b>
        </h5>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            //getRowId={(row) => row._id}
            loading={false}
            components={{ Toolbar: CustomToolbar }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserList;
