import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import routes from "../routes";

const loading = <div>Loading...</div>;

const Content = () => {
  return (
    <>
      <Suspense fallback={loading}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <>
                      <route.component {...props} />
                    </>
                  )}
                />
              )
            );
          })}
          <Navigate from="/" to="/user-dashboard" />
        </Routes>
      </Suspense>
    </>
  );
};

export default Content;
