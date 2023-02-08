import React from "react";
import { useState, useEffect } from "react";
import {
  getSingleCustomerAsync,
  customerDataReset,
  updateCustomerAsync,
  customerUpdateResponseDataReset,
} from "../../../Redux/slices/customer";
import { setAlertData, alertDataReset } from "../../../Redux/slices/alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UpdateCustomer = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    contactNumber1: null,
    contactNumber2: null,
    address: "",
    id: "",
  });

  const { name, nic, contactNumber1, contactNumber2, address } = formData;

  const {
    loading: customerLoading,
    data: customerData,
    error: customerError,
  } = useSelector((state) => state.customer.customerData);
  const {
    loading: customerUpdateResponseDataLoading,
    data: customerUpdateResponseData,
    error: customerUpdateResponseDataError,
  } = useSelector((state) => state.customer.customerUpdateResponseData);

  useEffect(() => {
    if (params.id) {
      dispatch(getSingleCustomerAsync(params.id));
    }
    return () => {
      dispatch(customerUpdateResponseDataReset());
      dispatch(customerDataReset());
    };
  }, [dispatch, params]);

  useEffect(() => {
    if (!customerLoading && customerData) {
      setFormData({
        ...formData,
        address: customerData.address,
        contactNumber1: customerData.contactNumber1,
        contactNumber2: customerData.contactNumber2,
        name: customerData.name,
        nic: customerData.nic,
        id: customerData._id,
      });
    }
  }, [customerLoading, customerData]);

  useEffect(() => {
    if (customerUpdateResponseData) {
      dispatch(
        setAlertData({
          msg: "Successfully Updated",
          alertType: "success",
        })
      );
      setTimeout(() => dispatch(alertDataReset()), 5000);
    }
  }, [dispatch, customerUpdateResponseData]);

  useEffect(() => {
    if (customerError) {
      dispatch(
        setAlertData({ msg: "Something went wrong", alertType: "error" })
      );
      setTimeout(() => dispatch(alertDataReset()), 5000);
    }
  }, [dispatch, customerError]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCustomerAsync(formData));
    console.log(formData);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-4">
          <b>Customer Details</b>
        </h5>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="row">
            <div className="col-lg-4 mb-3 ">
              <label for="name" className="form-label">
                Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                required
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="col-lg-4 mb-3 ">
              <label for="name" className="form-label">
                NIC <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="nic"
                value={nic}
                required
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="col-lg-4 mb-3 ">
              <label for="name" className="form-label">
                Contact Number 1 <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                name="contactNumber1"
                value={contactNumber1}
                required
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="col-lg-4 mb-3 ">
              <label for="name" className="form-label">
                Contact Number 2
              </label>
              <input
                type="number"
                className="form-control"
                name="contactNumber2"
                value={contactNumber2}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="col-lg-4 mb-3 ">
              <label for="name" className="form-label">
                Address <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={address}
                required
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-primary me-md-2" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCustomer;
