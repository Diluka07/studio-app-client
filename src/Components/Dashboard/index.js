import React from "react";

const Dashboard = () => {
  return (
    <>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          {/* <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> */}

          <div class="mb-3 mt-3">
            <label for="exampleFormControlInput1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Example textarea
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
