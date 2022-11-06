import React from "react";
import { useState } from "react";
import { customerRegisterAsync } from "../../../Redux/slices/customer";
import { useDispatch, useSelector } from "react-redux";
import { useQRCode } from "react-qrcode";
import { saveAs } from 'file-saver';

const CustomerRegister = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.customer.customerRegisterData
  );

  const [value, setValue] = useState("uhjguhffasT768yf5");
  const dataUrl = useQRCode(value);

  const downloadQR = () => {
    saveAs(dataUrl, "QR.png")
  }

  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    contactNumber1: null,
    contactNumber2: null,
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
        <h5 className="card-title mb-4">Customer Register</h5>
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
              Create
            </button>
          </div>
        </form>
        {/* <div>dataUrl: {dataUrl}</div>
        <img src={dataUrl} onClick={downloadQR}/>
        <input onChange={(e) => setValue(e.currentTarget.value)} /> */}
      </div>
    </div>
  );
};

export default CustomerRegister;
