import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOAD_USER,
  USER_LOADING,
  CHANGE_PASSWORD,
} from "../Actions/types";

const intialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false, //Has to change into false
  access: 0,
  passwordChange: false,
  loading: true,
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("firstName", payload.firstName);
      localStorage.setItem("lastName", payload.lastName);
      localStorage.setItem("access", 0);
      localStorage.setItem("id", payload.id);

      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case LOAD_USER:
      if (localStorage.token) {
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false,
          access: parseInt(payload.access),
        };
      }
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.clear();
      sessionStorage.clear();
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        access: 0,
        loading: false,
        user: null,
      };

    case CHANGE_PASSWORD:
      return {
        ...state,
        passwordChange: payload,
      };
    default:
      return state;
  }
}
