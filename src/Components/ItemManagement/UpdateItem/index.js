import React from "react";
import { useState, useEffect } from "react";
import {
  getExistingMusicalItemAsync,
  getMusicalItemDataReset,
  getAllCategoriesAsync,
  getAllCategoriesDataReset,
  updateMusicalItemAsync,
  updateMusicalItemDataReset,
} from "../../../Redux/slices/musicalItem";
import { setAlertData, alertDataReset } from "../../../Redux/slices/alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";

const UpdateItem = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {
    loading: loadingMusicalItem,
    data: musicalItem,
    error: getMusicalItemError,
  } = useSelector((state) => state.musicalItem.musicalItemData);
  const {
    loading: loadingCategories,
    data: categories,
    error: categoryError,
  } = useSelector((state) => state.musicalItem.categoriesData);
  const {
    loading: itemUpdateLoading,
    data: updateData,
    error: updateError,
  } = useSelector((state) => state.musicalItem.musicalItemUpdateResponseData);

  const [formData, setFormData] = useState({
    category: "",
    name: "",
    id: "",
    cost: "",
  });
  const { category, name, cost } = formData;

  const [displayCost, setDisplayCost] = useState("");

  useEffect(() => {
    if (params.id) {
      dispatch(getExistingMusicalItemAsync(params.id));
      dispatch(getAllCategoriesAsync());
    }
    return () => {
      dispatch(getMusicalItemDataReset());
      dispatch(getAllCategoriesDataReset());
      dispatch(updateMusicalItemDataReset());
    };
  }, [dispatch, params]);

  useEffect(() => {
    if (!loadingMusicalItem && musicalItem) {
      setFormData({
        ...formData,
        category: musicalItem.category._id,
        name: musicalItem.name,
        cost: musicalItem.cost,
        id: musicalItem._id,
      });
      setDisplayCost(musicalItem.cost);
    }
  }, [loadingMusicalItem, musicalItem]);

  useEffect(() => {
    if (!itemUpdateLoading && updateData) {
      dispatch(
        setAlertData({
          msg: "Item updated successfully",
          alertType: "success",
        })
      );
      setTimeout(() => dispatch(alertDataReset()), 5000);
    }
  }, [dispatch, itemUpdateLoading, updateData]);

  useEffect(() => {
    if (getMusicalItemError || categoryError || updateError) {
      dispatch(
        setAlertData({ msg: "Something went wrong", alertType: "error" })
      );
      setTimeout(() => dispatch(alertDataReset()), 5000);
    }
  }, [dispatch, getMusicalItemError, categoryError, updateError]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    dispatch(updateMusicalItemAsync(formData));
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-4">
          <b>Update Item</b>
        </h5>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="row">
            <div className="col-lg-4 mb-3 ">
              <label for="name" className="form-label">
                Item Name <span style={{ color: "red" }}>*</span>
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
          </div>
          <div className="row">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button className="btn btn-primary me-md-2" type="submit">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
