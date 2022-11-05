import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import Landing from "./Components/Landing";
import TestGrid from "./Components/Container/ProtectedLayout/TestGrid";
import TestL from "./Components/Container/ProtectedLayout/TestL";
import ProtectedLayout from "./Components/Container/ProtectedLayout";
import Dashboard from "./Components/Dashboard";
import CustomerRegister from "./Components/Customer/CustomerRegister";

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Landing />} />
            <Route path="landing" element={<Landing />} />
            <Route element={<ProtectedLayout />}>
              <Route path="t1" element={<TestGrid />} />
              <Route path="t2" element={<TestL />} />
              <Route path="dashboard" element={<Dashboard/>} />
              <Route path="customer-register" element={<CustomerRegister/>} />
            </Route>
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
