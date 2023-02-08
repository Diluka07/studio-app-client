import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import Landing from "./Components/Landing";
import ProtectedLayout from "./Components/Container/ProtectedLayout";

//Customer
import CustomerRegister from "./Components/CustomerManagement/CustomerRegister";
import UpdateCustomer from "./Components/CustomerManagement/UpdateCustomer";
import CustomerList from "./Components/CustomerManagement/CustomerList";

//Musical Items
import AddNewItem from "./Components/ItemManagement/AddNewItem";
import ItemList from "./Components/ItemManagement/ItemList";
import UpdateItem from "./Components/ItemManagement/UpdateItem";

//User
import UserRegister from "./Components/UserManagement/UserRegister";
import UserList from "./Components/UserManagement/UserList";

//Item Rental
import NewItemRental from "./Components/MusicalItemRental/NewItemRental";
import FinishRental from "./Components/MusicalItemRental/FinishRental";

//Studio ental
import NewStudioRental from "./Components/StudioRental/NewStudioRental";

//Studio ental
import MaintananceList from "./Components/Maintanance/MaintenanceList";
import NewMaintanance from "./Components/Maintanance/NewMaintanance";

//Reports
import StockReport from "./Components/Reports/StockReport";



//Common
import Dashboard from "./Components/Dashboard";
import Alert from "./Components/Shared/Alert";
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
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              {/* Customer */}
              <Route path="customer-register" element={<CustomerRegister />} />
              <Route path="customer-details" element={<UpdateCustomer />} />
              <Route path="customer-list" element={<CustomerList />} />

              {/* Items */}
              <Route path="new-item" element={<AddNewItem />} />
              <Route path="item-list" element={<ItemList />} />
              <Route path="update-item/:id" element={<UpdateItem />} />

              {/* User */}
              <Route path="user-register" element={<UserRegister />} />
              <Route path="user-list" element={<UserList />} />

              {/* Item Rental */}
              <Route path="new-item-rental" element={<NewItemRental />} />
              <Route path="item-rental/:id" element={<FinishRental />} />

              {/* Studio Rental */}
              <Route path="new-studio-rental" element={<NewStudioRental />} />

               {/* Maintanance */}
               <Route path="maintanance-list" element={<MaintananceList />} />
               <Route path="new-maintanance" element={<NewMaintanance />} />

               {/* Reports */}
               <Route path="stock-report" element={<StockReport />} />


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
