import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_DIAGNOSTICS,
  SENDDIAGNOSTIC,
  DIAGNOSTIC_ERROR,
  DELETE_DIAGNOSTIC,
  UPDATE_DIAGNOSTIC,
} from "./types";

import { url } from "../utils/LocalVariables";

//send test
export const sendDiagnostic = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
    },
  };
  const link = "http://52.142.60.162:5000/sympt";
  try {
    const res = await axios.post(link, data, config);
    data.append("result", res.data.result);
    try {
      const res2 = await axios.post(
        url + "/api/diagnostic/create",
        data,
        config
      );

      if (res.data.result[0] == "C") {
        dispatch(setAlert("Diagnostic result: " + res.data.result, "danger"));
      } else if (res.data.result[0] == "N") {
        dispatch(setAlert("Test result: " + res.data.result, "success"));
      }
    } catch (error) {
      dispatch({
        payload: error,
        type: DIAGNOSTIC_ERROR,
      });
    }

    dispatch({
      type: SENDDIAGNOSTIC,
      payload: res.data.result,
    });
  } catch (error) {
    dispatch({
      payload: error,
      type: DIAGNOSTIC_ERROR,
    });
  }
};

//get tests

export const getDiagnostics = (id = -1) => async (dispatch) => {
  try {
    var res = {};
    if (id == -1) {
      res = await axios.get(url + "/api/diagnostic?ordering=-id");
    } else {
      res = await axios.get(
        url + "/api/diagnostic?search=" + id + "&ordering=-id"
      );
    }
    dispatch({ type: GET_DIAGNOSTICS, payload: res.data });
  } catch (err) {
    dispatch({
      type: DIAGNOSTIC_ERROR,
      payload: { msg: err.response },
    });
  }
};

//delete diagnostic

export const deleteDiagnostic = (id) => async (dispatch) => {
  try {
    var res = {};
    res = await axios.delete(url + `/api/diagnostic/${id}/delete/`);

    dispatch({ type: DELETE_DIAGNOSTIC, payload: id });
    dispatch(setAlert("diagnostic Removed", "success"));
  } catch (err) {
    dispatch({
      type: DIAGNOSTIC_ERROR,
      payload: { msg: err.response },
    });
  }
};

//update diagnostic
export const updateDiagnostic = (data, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
    },
  };
  const link = url + "/api/diagnostic/" + id + "/update/";
  try {
    const res = await axios.put(link, data, config);

    dispatch({
      type: UPDATE_DIAGNOSTIC,
      payload: res.data,
    });
    dispatch(setAlert("diagnostic updated", "success"));
  } catch (error) {
    //const errors = error.response.data.errors;

    dispatch({
      payload: error,
      type: DIAGNOSTIC_ERROR,
    });
  }
};
