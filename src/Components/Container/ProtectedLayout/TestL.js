import React, { useEffect } from "react";
import { loginAsync } from "../../../Redux/slices/authentication";
import { useDispatch, useSelector } from "react-redux";

const TestL = () => {
  const dispatch = useDispatch();

  const { loading, data, error } = useSelector(
    (state) => state.authentication.loggedInUserData
  );

  useEffect(() => {
    dispatch(loginAsync());
  }, []);
  return <div>Test</div>;
};

export default TestL;
