import React from "react";
import { useState, useEffect } from "react";
import { customerRegisterAsync } from "../../../Redux/slices/customer";
import { setAlertData, alertDataReset } from "../../../Redux/slices/alert";
import { useDispatch, useSelector } from "react-redux";

const UpdateCustomer = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.customer.customerRegisterData
  );

  useEffect(() => {
    if (data.success) {
      dispatch(
        setAlertData({
          msg: "Registration Successfull",
          alertType: "success",
        })
      );
      setTimeout(() => dispatch(alertDataReset()), 5000);
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (error) {
      dispatch(
        setAlertData({ msg: "Something went wrong", alertType: "error" })
      );
      setTimeout(() => dispatch(alertDataReset()), 5000);
    }
  }, [dispatch, error]);

  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    contactNumber1: "",
    contactNumber2: "",
    address: "",
  });

  const { name, nic, contactNumber1, contactNumber2, address } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(customerRegisterAsync(formData));
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
                value="K Perera"
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
                value="982510025V"
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
                value="0785696548"
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
                value="Colombo 07"
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
