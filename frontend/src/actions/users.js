import axios from "axios";
import ReactDOM from "react-dom";
import { setAlert } from "./alert";
import {
  GET_USERS,
  GET_USER,
  USERS_ERROR,
  DELETE_USERS,
  ADD_USER,
  UPDATE_USER,
  PASSWORD_CHANGED,
} from "./types";
import { Link, Redirect } from "react-router-dom";
import { url } from "../utils/LocalVariables";

//get patients

export const getUsers = () => async (dispatch) => {
  try {
    var res = {};

    res = await axios.get(url + "/api/accounts");

    dispatch({ type: GET_USERS, payload: res.data });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response },
    });
  }
};

export const getUser = (user_data) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER, payload: user_data });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response },
    });
  }
};

//delete user

export const deleteUser = (id) => async (dispatch) => {
  try {
    var res = {};

    res = await axios.delete(url + `/api/account/${id}/delete`);

    dispatch({ type: DELETE_USERS, payload: id });
    dispatch(setAlert("User Removed", "success"));
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response },
    });
  }
};

//add user
export const add_user = (data, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
    },
  };
  try {
    const res = await axios.post(url + "/api/register", data, config);

    dispatch({
      type: ADD_USER,
      payload: res.data,
    });

    dispatch(setAlert("User added", "success"));
    history.push("/users");
  } catch (error) {
    if (error.response) {
      const errors = error.response.data;
      console.log(errors);
      if (errors.errors) {
        let i = 4000;
        for (let key in errors.errors) {
          i = i + 500;

          dispatch(setAlert(errors.errors[key] + " :" + key, "danger", i));
        }
      }
    }

    dispatch({
      type: USERS_ERROR,
      payload: error,
    });
    return false;
  }
};

//update user
export const update_user = (data, id, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
    },
  };
  const link = url + "/api/account/" + id + "/update";
  try {
    const res = await axios.put(link, data, config);

    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
    dispatch(setAlert("User updated", "success"));
    //history.push("/users");
  } catch (error) {
    const errors = error.response.data;
    if (errors) {
      let i = 4000;
      for (let key in errors) {
        i = i + 500;

        dispatch(setAlert(errors[key][0] + " :" + key, "danger", i));
      }
    }

    dispatch({
      type: USERS_ERROR,
      payload: error,
    });
  }
};

export const changePassword = (data, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
    },
  };
  const link = url + "/api/change_Password";
  try {
    if (data.new_password === data.new_password2) {
      const res = await axios.put(link, data, config);

      dispatch({
        type: PASSWORD_CHANGED,
        payload: res.data,
      });
      dispatch(setAlert("Password changed", "success"));
      //history.push("/users");}
    } else {
      dispatch(setAlert("Passwords must match", "danger"));
    }
  } catch (error) {
    console.log(error);
    const errors = error.response.data;
    if (errors) {
      let i = 4000;
      for (let key in errors) {
        i = i + 500;

        dispatch(setAlert(errors[key][0] + " :" + key, "danger", i));
      }
    }

    dispatch({
      type: USERS_ERROR,
      payload: error,
    });
  }
};
