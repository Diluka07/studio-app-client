import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import Landing from "./Components/Landing";
import TestGrid from "./Components/Container/ProtectedLayout/TestGrid";
import ProtectedLayout from "./Components/Container/ProtectedLayout";
import Dashboard from "./Components/Dashboard";
import CustomerRegister from "./Components/CustomerManagement/CustomerRegister";
import AddNewItem from "./Components/ItemManagement/AddNewItem";
import Alert from "./Components/Shared/Alert";
import ItemList from "./Components/ItemManagement/ItemList";
import UpdateItem from "./Components/ItemManagement/UpdateItem";
import Qr from "./Components/test/Qr";

function App() {
  return (
    <>
      <Provider store={store}>
        <Alert />
        <BrowserRouter>
          <Routes>
            <Route index element={<Landing />} />
            <Route path="landing" element={<Landing />} />
            <Route element={<ProtectedLayout />}>
              <Route index element={<TestGrid />} />
              <Route path="t1" element={<TestGrid />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="customer-register" element={<CustomerRegister />} />
              <Route path="new-item" element={<AddNewItem />} />
              <Route path="item-list" element={<ItemList />} />
              <Route path="update-item/:id" element={<UpdateItem />} />
              <Route path="qr" element={<Qr />} />
            </Route>
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
