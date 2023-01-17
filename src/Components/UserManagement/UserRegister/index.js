import React from "react";
import { useState, useEffect } from "react";
import { customerRegisterAsync } from "../../../Redux/slices/customer";
import { setAlertData, alertDataReset } from "../../../Redux/slices/alert";
import { useDispatch, useSelector } from "react-redux";

const UseRegister = () => {
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
          <b>User Register</b>
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
                Username(email) <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
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
                User Type<span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">--Select--</option>
              </select>
            </div>
            <div className="col-lg-4 mb-3 ">
              <label for="name" className="form-label">
                Password <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="password"
                className="form-control"
                name="name"
                value={name}
                required
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="col-lg-4 mb-3 ">
              <label for="name" className="form-label">
                Confirm Password <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="password"
                className="form-control"
                name="name"
                value={name}
                required
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="col-lg-4 mb-3 ">
              <label for="name" className="form-label">
                Contact Number<span style={{ color: "red" }}>*</span>
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
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-primary me-md-2" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UseRegister;
