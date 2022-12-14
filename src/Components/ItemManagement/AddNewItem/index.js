import React from "react";
import { useState, useEffect } from "react";
import {
  addNewItemAsync,
  addNewItemDataReset,
  getAllCategoriesAsync,
  getAllMusicalItemsAsync,
  getExistingMusicalItemAsync,
  getMusicalItemDataReset,
} from "../../../Redux/slices/musicalItem";
import { setAlertData, alertDataReset } from "../../../Redux/slices/alert";
import { useDispatch, useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import { useQRCode } from "react-qrcode";
import { saveAs } from "file-saver";

const AddNewItem = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.musicalItem.addNewItemData
  );
  const {
    loading: loadingCategories,
    data: categories,
    error: categoryError,
  } = useSelector((state) => state.musicalItem.categoriesData);
  const {
    loading: loadingMusicalItems,
    data: musicalItems,
    error: musicalItemsError,
  } = useSelector((state) => state.musicalItem.musicalItemsData);
  const {
    loading: loadingMusicalItem,
    data: musicalItem,
    error: musicalItemError,
  } = useSelector((state) => state.musicalItem.musicalItemData);

  const [formData, setFormData] = useState({
    isExistingItem: false,
    category: "",
    itemName: "",
    itemId: "",
    cost: "",
  });
  const { existingItem, category, itemName, cost } = formData;

  const [displayCost, setDisplayCost] = useState("");

  const [newItemId, setNewItemId] = useState("");
  const qrValue = useQRCode(newItemId);

  useEffect(() => {
    dispatch(getAllCategoriesAsync());
    dispatch(getAllMusicalItemsAsync());
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(
        setAlertData({
          msg: "New Item added successfully",
          alertType: "success",
        })
      );
      setTimeout(() => dispatch(alertDataReset()), 5000);
      setNewItemId(data.musicalItem._id);
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (error || musicalItemsError || musicalItemError) {
      dispatch(
        setAlertData({ msg: "Something went wrong", alertType: "error" })
      );
      setTimeout(() => dispatch(alertDataReset()), 5000);
    }
  }, [dispatch, error]);

  const downloadQR = () => {
    saveAs(qrValue, "QR.png");
  };

  const handleCheck = (e) => {
    setFormData({
      ...formData,
      isExistingItem: e.target.checked,
      category: "",
      cost: "",
      itemId: "",
      itemName: "",
    });
    setDisplayCost("");
    dispatch(addNewItemDataReset());
    dispatch(getMusicalItemDataReset());
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSelectExistingItem = (e) => {
    dispatch(getExistingMusicalItemAsync(e.target.value));
    setFormData({
      ...formData,
      itemId: e.target.value,
    });
  };

  const onSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    dispatch(addNewItemAsync(formData));
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-4">Add New Item</h5>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="row">
            <div className="col-lg-4 mb-3 ">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value={existingItem}
                  id="flexCheckDefault"
                  onChange={(e) => handleCheck(e)}
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Existing Item
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            {formData.isExistingItem ? (
              <>
                <div className="col-lg-4 mb-3 ">
                  <label for="exampleDataList" class="form-label">
                    Select Item <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => onSelectExistingItem(e)}
                    required
                  >
                    <option value="">--Select--</option>
                    {!loadingMusicalItems &&
                    musicalItemsError === null &&
                    musicalItems.length > 0
                      ? musicalItems.map((c) => (
                          <option value={c._id}>{c.name} </option>
                        ))
                      : []}
                  </select>
                </div>
                <div className="col-lg-4 mb-3 ">
                  <label for="name" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      !loadingMusicalItem && musicalItem
                        ? musicalItem.category.name
                        : ""
                    }
                    disabled
                  />
                </div>
                <div className="col-lg-4 mb-3 ">
                  <label for="name" className="form-label">
                    Cost
                  </label>
                  <NumericFormat
                    className="form-control"
                    value={
                      !loadingMusicalItem && musicalItem ? musicalItem.cost : ""
                    }
                    displayType={"input"}
                    fixedDecimalScale={true}
                    thousandSeparator=","
                    prefix={"Rs. "}
                    decimalScale={2}
                    disabled
                  />
                </div>
              </>
            ) : (
              <>
                <div className="col-lg-4 mb-3 ">
                  <label for="name" className="form-label">
                    Item Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="itemName"
                    value={itemName}
                    required
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="col-lg-4 mb-3 ">
                  <label for="exampleDataList" class="form-label">
                    Select Category <span style={{ color: "red" }}>*</span>
                  </label>

                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => onChange(e)}
                    value={category}
                    name="category"
                  >
                    <option value="">--Select--</option>
                    {!loadingCategories &&
                    categoryError === null &&
                    categories.length > 0
                      ? categories.map((c) => (
                          <option value={c.id}>{c.name} </option>
                        ))
                      : []}
                  </select>
                </div>
                <div className="col-lg-4 mb-3 ">
                  <label for="name" className="form-label">
                    Cost <span style={{ color: "red" }}>*</span>
                  </label>
                  <NumericFormat
                    value={displayCost}
                    className="form-control"
                    thousandSeparator=","
                    prefix="Rs. "
                    onValueChange={(values, sourceInfo) => {
                      setFormData({
                        ...formData,
                        cost: values.value,
                      });
                      setDisplayCost(values.formattedValue);
                    }}
                    fixedDecimalScale={true}
                    decimalScale={2}
                    renderText={(value) => <>{value}</>}
                    required
                  />
                </div>
              </>
            )}
          </div>
          <div className="row">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button className="btn btn-primary me-md-2" type="submit">
                Add
              </button>
            </div>
          </div>
        </form>

        {!loading && data && (
          <>
            <h3>QR Code </h3>{" "}
            <img style={{ width: "300px", height: "300px" }} src={qrValue} />
            <button type="button" onClick={downloadQR} className="btn btn-info">
              Download <i class="bi bi-download"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AddNewItem;
