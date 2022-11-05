const CustomerRegister = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-4">Customer Register</h5>
        <div className="row">
          <div className="col-lg-4 mb-3 ">
            <label for="name" className="form-label">
              Name <span style={{ color: "red" }}>*</span>
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-lg-4 mb-3 ">
            <label for="name" className="form-label">
              NIC <span style={{ color: "red" }}>*</span>
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-lg-4 mb-3 ">
            <label for="name" className="form-label">
              Contact Number <span style={{ color: "red" }}>*</span>
            </label>
            <input type="number" className="form-control" />
          </div>
          <div className="col-lg-4 mb-3 ">
            <label for="name" className="form-label">
              Address <span style={{ color: "red" }}>*</span>
            </label>
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button className="btn btn-primary me-md-2" type="button">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;
