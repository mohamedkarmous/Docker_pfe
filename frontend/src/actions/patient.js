import axios from "axios";
import ReactDOM from "react-dom";
import { setAlert } from "./alert";
import {
  GET_PATIENTS,
  GET_PATIENT,
  PATIENT_ERROR,
  DELETE_PATIENTS,
  ADD_PATIENT,
  UPDATE_PATIENT,
} from "./types";
import { Link, Redirect } from "react-router-dom";

import { url } from "../utils/LocalVariables";

//get patients

export const getPatients = (id = -1) => async (dispatch) => {
  try {
    var res = {};
    if (id == -1) {
      res = await axios.get(url + "/api/patient");
    } else {
      res = await axios.get(url + "/api/patient?search=" + id);
    }
    dispatch({ type: GET_PATIENTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: PATIENT_ERROR,
      payload: { msg: err.response },
    });
  }
};

export const getPatient = (patient_data) => async (dispatch) => {
  try {
    dispatch({ type: GET_PATIENT, payload: patient_data });
  } catch (err) {
    dispatch({
      type: PATIENT_ERROR,
      payload: { msg: err.response },
    });
  }
};

//delete patient

export const deletePatient = (id) => async (dispatch) => {
  try {
    var res = {};

    console.log("deleting patients");
    res = await axios.delete(url + `/api/patient/${id}/delete/`);

    dispatch({ type: DELETE_PATIENTS, payload: id });
    dispatch(setAlert("Patient Removed", "success"));
  } catch (err) {
    dispatch({
      type: PATIENT_ERROR,
      payload: { msg: err.response },
    });
  }
};

//add patient
export const add_patient = (data, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
    },
  };
  try {
    const res = await axios.post(url + "/api/patient/create", data, config);

    dispatch({
      type: ADD_PATIENT,
      payload: res.data,
    });
    history.push("/patient");
    dispatch(setAlert("Patient added", "success"));
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
      type: PATIENT_ERROR,
    });
    return false;
  }
};

//update patient
export const update_patient = (data, id, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
    },
  };
  const link = url + "/api/patient/" + id + "/update/";
  try {
    const res = await axios.put(link, data, config);

    dispatch({
      type: UPDATE_PATIENT,
      payload: res.data,
    });
    dispatch(setAlert("Patient updated", "success"));

    history.push("/patient");
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
      type: PATIENT_ERROR,
    });
  }
};
